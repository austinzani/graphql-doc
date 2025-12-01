import { DocModel, Operation, Section, Subsection } from '../../transformer/types';
import { GeneratedFile } from '../types';
import { MdxRenderer } from '../../renderer/mdx-renderer';
import { SidebarGenerator } from './sidebar-generator';
import { escapeYamlValue, escapeYamlTag } from '../../utils/yaml-escape';
import { slugify } from '../../utils/string-utils';
import * as fs from 'fs';
import * as path from 'path';

export interface DocusaurusAdapterConfig {
  singlePage?: boolean;
  outputPath?: string;
}

export class DocusaurusAdapter {
  private renderer: MdxRenderer;
  private sidebarGenerator: SidebarGenerator;
  private config: DocusaurusAdapterConfig;

  constructor(config: DocusaurusAdapterConfig = {}) {
    this.renderer = new MdxRenderer();
    this.sidebarGenerator = new SidebarGenerator();
    this.config = config;
  }

  adapt(model: DocModel): GeneratedFile[] {
    const files: GeneratedFile[] = [];

    if (this.config.singlePage) {
      // Single page mode implementation
      // For now, we'll just concatenate all operations into one file
      // This is a basic implementation of single-page mode
      const content = model.sections
        .map((section: Section) => {
          return section.subsections
            .map((subsection: Subsection) => {
              return subsection.operations
                .map((op: Operation) => this.generateMdx(op))
                .join('\n\n---\n\n');
            })
            .join('\n\n');
        })
        .join('\n\n');

      files.push({
        path: 'index.mdx',
        content: content,
        type: 'mdx',
      });
      return files;
    }

    for (const section of model.sections) {
      const sectionPath = slugify(section.name);

      // Section category file
      files.push({
        path: `${sectionPath}/_category_.json`,
        content: this.generateCategoryJson(section.name, section.order),
        type: 'json',
      });

      for (const subsection of section.subsections) {
        // If subsection name is empty, it's the root of the section
        const isRootSubsection = subsection.name === '';
        const subsectionPath = isRootSubsection
          ? sectionPath
          : `${sectionPath}/${slugify(subsection.name)}`;

        if (!isRootSubsection) {
          files.push({
            path: `${subsectionPath}/_category_.json`,
            content: this.generateCategoryJson(subsection.name, 0), // Order 0 for now
            type: 'json',
          });
        }

        for (const op of subsection.operations) {
          const fileName = `${slugify(op.name)}.mdx`;
          files.push({
            path: `${subsectionPath}/${fileName}`,
            content: this.generateMdx(op),
            type: 'mdx',
          });
        }
      }
    }

    // Generate sidebars.js or sidebars.api.js
    const sidebarItems = this.sidebarGenerator.generate(model);
    const sidebarsPath = path.join(this.config.outputPath || process.cwd(), 'sidebars.js');

    if (fs.existsSync(sidebarsPath)) {
      files.push({
        path: 'sidebars.api.js',
        content: `module.exports = ${JSON.stringify(sidebarItems, null, 2)};`,
        type: 'js',
      });
    } else {
      files.push({
        path: 'sidebars.js',
        content: `module.exports = ${JSON.stringify({ apiSidebar: sidebarItems }, null, 2)};`,
        type: 'js',
      });
    }

    return files;
  }

  private generateMdx(op: Operation): string {
    const frontMatter = this.generateFrontMatter(op);
    const content = this.renderer.renderOperation(op);
    return `${frontMatter}\n\n${content}`;
  }

  private generateFrontMatter(op: Operation): string {
    const id = slugify(op.name);
    const title = escapeYamlValue(op.name);
    const sidebarLabel = escapeYamlValue(op.name);

    const lines = ['---', `id: ${id}`, `title: ${title}`, `sidebar_label: ${sidebarLabel}`];

    if (op.directives.docTags?.tags?.length) {
      const tags = op.directives.docTags.tags.map((t: string) => escapeYamlTag(t)).join(', ');
      lines.push(`tags: [${tags}]`);
    }

    // Add custom front matter if needed (e.g. for search)
    lines.push('hide_title: true'); // Common Docusaurus pattern if h1 is in content
    lines.push('---');

    return lines.join('\n');
  }

  private generateCategoryJson(label: string, position: number): string {
    return JSON.stringify(
      {
        label,
        position,
        collapsible: true,
        collapsed: true,
        link: {
          type: 'generated-index',
        },
      },
      null,
      2
    );
  }
}
