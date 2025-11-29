import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DocusaurusAdapter } from './docusaurus-adapter';
import { DocModel, Operation, Section } from '../../transformer/types';
import * as fs from 'fs';
import * as path from 'path';

vi.mock('fs');
vi.mock('../../renderer/mdx-renderer', () => {
  return {
    MdxRenderer: class {
      renderOperation = vi.fn().mockReturnValue('Mocked Content');
    },
  };
});

describe('DocusaurusAdapter', () => {
  const mockOperation: Operation = {
    name: 'getUser',
    operationType: 'query',
    arguments: [],
    returnType: { kind: 'SCALAR', name: 'User' },
    directives: {
      docGroup: { name: 'Users', order: 1 },
      docTags: { tags: ['read', 'user'] },
    },
    referencedTypes: [],
    isDeprecated: false,
    examples: [],
    errors: [],
  };

  const mockModel: DocModel = {
    sections: [
      {
        name: 'Users',
        order: 1,
        subsections: [
          {
            name: '', // Root subsection
            operations: [mockOperation],
          },
          {
            name: 'Admin',
            operations: [
              {
                ...mockOperation,
                name: 'deleteUser',
                directives: { docGroup: { name: 'Users', subsection: 'Admin', order: 2 } },
              },
            ],
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('generates sidebars.js when no existing sidebar file', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    const adapter = new DocusaurusAdapter();
    const files = adapter.adapt(mockModel);

    const sidebarFile = files.find((f) => f.path === 'sidebars.js');
    expect(sidebarFile).toBeDefined();
    expect(sidebarFile?.content).toContain('apiSidebar');
  });

  it('generates sidebars.api.js when sidebar file exists', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    const adapter = new DocusaurusAdapter();
    const files = adapter.adapt(mockModel);

    const sidebarFile = files.find((f) => f.path === 'sidebars.api.js');
    expect(sidebarFile).toBeDefined();
    expect(sidebarFile?.content).not.toContain('apiSidebar'); // Should be just the array

    const mainSidebar = files.find((f) => f.path === 'sidebars.js');
    expect(mainSidebar).toBeUndefined();
  });

  it('generates correct front matter', () => {
    const adapter = new DocusaurusAdapter();
    const files = adapter.adapt(mockModel);
    console.log(
      'Generated files:',
      files.map((f) => f.path)
    );
    const mdxFile = files.find((f) => f.path === 'users/get-user.mdx');

    expect(mdxFile).toBeDefined();
    expect(mdxFile?.content).toContain('id: get-user');
    expect(mdxFile?.content).toContain('title: getUser');
    expect(mdxFile?.content).toContain('sidebar_label: getUser');
    expect(mdxFile?.content).toContain('tags: ["read", "user"]');
  });

  it('generates correct category json', () => {
    const adapter = new DocusaurusAdapter();
    const files = adapter.adapt(mockModel);
    const categoryFile = files.find((f) => f.path === 'users/_category_.json');

    expect(categoryFile).toBeDefined();
    const content = JSON.parse(categoryFile!.content);
    expect(content.label).toBe('Users');
    expect(content.position).toBe(1);
    expect(content.link.type).toBe('generated-index');
  });
});
