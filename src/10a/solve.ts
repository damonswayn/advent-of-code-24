import path from 'node:path';
import { solve } from './10a';
import { TestInput } from '../lib/TestInput';

export default function run(): string {
    const PROBLEM_INPUT = path.resolve(__dirname, '10a.input.txt');
    const input = TestInput.fromFile(PROBLEM_INPUT);
    return solve(input);
}