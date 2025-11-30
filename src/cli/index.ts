#!/usr/bin/env node
import { Command } from 'commander';
import { version } from '../index.js';

const program = new Command();

program
  .name('graphql-docs')
  .description('GraphQL Operation-First Documentation Generator')
  .version(version);

program
  .command('generate')
  .description('Generate documentation from GraphQL schema')
  .option('-s, --schema <path>', 'Path to GraphQL schema')
  .option('-o, --output <path>', 'Output directory')
  .option('-c, --config <path>', 'Path to config file')
  .action(async (options) => {
    try {
      const { loadGeneratorConfig } = await import('../core/config/loader.js');
      const { Generator } = await import('../core/generator.js');

      // Load config (pass custom config path if provided)
      const config = await loadGeneratorConfig(process.cwd(), options.config);

      // Override config with CLI options
      if (options.output) {
        config.outputDir = options.output;
      }

      // Determine schema pointer
      // 1. CLI option
      // 2. Config (if we add schema to config)
      // 3. Default 'schema.graphql'
      let schemaPointer = options.schema;

      if (!schemaPointer) {
        // TODO: Try to get from graphql-config if not provided
        // For now default to schema.graphql
        schemaPointer = 'schema.graphql';
        console.log(`No schema provided, using default: ${schemaPointer}`);
      }

      const generator = new Generator(config);
      await generator.generate(schemaPointer);
    } catch (error) {
      console.error('Error generating documentation:', error);
      process.exit(1);
    }
  });

program.parse();
