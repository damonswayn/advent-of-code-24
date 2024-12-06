import path from 'node:path';
import { TestInput } from '../lib/TestInput';
import { solve } from './02b';

export default function run(): string {
    const PROBLEM_INPUT = path.resolve(__dirname, '02b.input.txt');
    const input = TestInput.fromFile(PROBLEM_INPUT);
    return solve(input);
}
