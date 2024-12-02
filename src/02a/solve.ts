import path from 'node:path';
import { TestInput } from '../lib/TestInput';
import { solve } from './02a';

export default function run(): string {
  const PROBLEM_INPUT = path.resolve(__dirname, '02a.input.txt');
  const input = TestInput.fromFile(PROBLEM_INPUT);
  return solve(input);
}