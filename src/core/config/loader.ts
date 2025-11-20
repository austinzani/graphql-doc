import { cosmiconfig } from 'cosmiconfig';
import { loadConfig } from 'graphql-config';
import { Config, ConfigSchema } from './schema.js';

const MODULE_NAME = 'graphql-docs';

export async function loadGeneratorConfig(rootPath: string = process.cwd()): Promise<Config> {
  // 1. Try to load from .graphqlrc (graphql-config)
  try {
    const gqlConfig = await loadConfig({ rootDir: rootPath });
    if (gqlConfig) {
      const extensionConfig = gqlConfig.getDefault().extension(MODULE_NAME);

      if (extensionConfig) {
        return ConfigSchema.parse(extensionConfig);
      }
    }
  } catch (error) {
    // Ignore error if .graphqlrc is not found or invalid, fall back to cosmiconfig
  }

  // 2. Try to load from cosmiconfig (graphql-docs.config.js, etc.)
  const explorer = cosmiconfig(MODULE_NAME);
  const result = await explorer.search(rootPath);

  if (result && result.config) {
    return ConfigSchema.parse(result.config);
  }

  // 3. Return default config
  return ConfigSchema.parse({});
}
