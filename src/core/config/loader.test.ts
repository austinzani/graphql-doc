import { describe, it, expect } from 'vitest';
import { loadGeneratorConfig } from './loader.js';

describe('loadGeneratorConfig', () => {
  it('loads default config when no config file exists', async () => {
    const config = await loadGeneratorConfig();
    expect(config.outputDir).toBe('./docs/api');
    expect(config.framework).toBe('docusaurus');
  });
});
