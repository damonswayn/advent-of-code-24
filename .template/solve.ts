import path from 'node:path';
import { solve } from './<<PART_NAME>>';
import { TestInput } from '../lib/TestInput';

export default function run(): string {
  const PROBLEM_INPUT = path.resolve(__dirname, '<<PART_NAME>>.input.txt');
  const input = TestInput.fromFile(PROBLEM_INPUT);
  return solve(input);
}