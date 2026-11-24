import * as fs from 'node:fs';
import * as path from 'node:path';

// Entrant's genuine make.fun handle as strictly specified by competition criteria
const USERNAME: string = 'alenoathera';

function main(): void {
  // Defensive validation against competition gate contract (1-30 UTF-8 characters, single word, non-empty)
  if (USERNAME.length < 1 || USERNAME.length > 30 || USERNAME.trim().length === 0) {
    throw new Error(`Invalid username length: ${USERNAME.length}`);
  }

  // Validate single word constraint: no spaces, tabs, or newlines
  if (/\s/.test(USERNAME)) {
    throw new Error(`Username must be a single word without whitespace: "${USERNAME}"`);
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  fs.mkdirSync(outputDir, { recursive: true });
  const targetPath = path.join(outputDir, 'entry.txt');

  // Deterministically write exact handle with zero trailing newline or whitespace padding
  fs.writeFileSync(targetPath, Buffer.from(USERNAME, 'utf8'));
}

main();
