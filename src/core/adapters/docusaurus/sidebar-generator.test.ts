import { describe, it, expect } from 'vitest';
import { SidebarGenerator } from './sidebar-generator';
import { DocModel, Operation } from '../../transformer/types';

describe('SidebarGenerator', () => {
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

  it('generates correct sidebar structure', () => {
    const generator = new SidebarGenerator();
    const items = generator.generate(mockModel);

    expect(items).toBeDefined();
    expect(items).toHaveLength(1);

    const usersCategory = items[0];
    expect(usersCategory.type).toBe('category');
    expect(usersCategory.label).toBe('Users');
    expect(usersCategory.items).toHaveLength(2);

    // Check root operation
    const getUserOp = usersCategory.items?.find((item) => item.label === 'getUser');
    expect(getUserOp).toBeDefined();
    expect(getUserOp?.type).toBe('doc');
    expect(getUserOp?.id).toBe('users/get-user');

    // Check nested category
    const adminCategory = usersCategory.items?.find((item) => item.label === 'Admin');
    expect(adminCategory).toBeDefined();
    expect(adminCategory?.type).toBe('category');
    expect(adminCategory?.items).toHaveLength(1);

    const deleteUserOp = adminCategory?.items?.[0];
    expect(deleteUserOp?.type).toBe('doc');
    expect(deleteUserOp?.id).toBe('users/admin/delete-user');
  });
});
