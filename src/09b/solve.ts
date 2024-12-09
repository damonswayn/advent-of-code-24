import path from 'node:path';
import { solve } from './09b';
import { TestInput } from '../lib/TestInput';

export default function run(): string {
    const PROBLEM_INPUT = path.resolve(__dirname, '09b.input.txt');
    const input = TestInput.fromFile(PROBLEM_INPUT);
    return solve(input);
}
