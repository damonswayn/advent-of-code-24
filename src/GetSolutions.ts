import path from 'node:path';
import fs from 'node:fs';

// load solutions directory path
const SOLUTIONS_DIR = path.resolve(__dirname);

// filter to solution directories only
const solutions = fs.readdirSync(SOLUTIONS_DIR)
  .filter((file) => /[012][0-9][abAB]?/.test(file));

// for each solution directory, load the solve.ts file and run the default export
solutions.forEach((solutionPath) => {
  const solutionDir = path.resolve(SOLUTIONS_DIR, solutionPath);
  const solutionFiles = fs.readdirSync(solutionDir);
  if (solutionFiles.includes('solve.ts')) {
    import(path.resolve(solutionDir, 'solve.ts')).then((module) => {
      console.log(`Solution for ${solutionPath} is ${module.default()}`);
    });
  } else {
    console.log(`No solve.ts found in ${solutionPath}`);
  }
});