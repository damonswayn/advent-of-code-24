import { TestInput } from '../lib/TestInput';
import path from 'node:path';
import { solve } from './08a';

describe('Day Eight, Problem A', () => {
    const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
    const testInput = TestInput.fromFile(TEST_INPUT_FILE);

    test('test input is correct', () => {
        expect(testInput.lines().length).toBe(12);
    });

    test('solution is correct', () => {
        expect(solve(testInput)).toBe('14');
    });
});
