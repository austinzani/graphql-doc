#!/usr/bin/env node
import { Command } from 'commander';
import { version } from '../index.js';

const program = new Command();

program
  .name('graphql-docs')
  .description('GraphQL Operation-First Documentation Generator')
  .version(version);

program.parse();
