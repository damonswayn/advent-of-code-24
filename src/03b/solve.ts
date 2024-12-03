import path from 'node:path';
import { TestInput } from '../lib/TestInput';
import { solve } from './03b';

export default function run(): string {
  const PROBLEM_INPUT = path.resolve(__dirname, '03b.input.txt');
  const input = TestInput.fromFile(PROBLEM_INPUT);
  return solve(input);
}

console.log(run());