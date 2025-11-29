import fs from 'fs-extra';
import path from 'path';
import { GeneratedFile } from './adapters/types';

export class FileWriter {
  constructor(private outputDir: string) {}

  async write(files: GeneratedFile[]) {
    await fs.ensureDir(this.outputDir);

    for (const file of files) {
      const filePath = path.join(this.outputDir, file.path);
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, file.content);
      console.log(`Written: ${file.path}`);
    }
  }
}
