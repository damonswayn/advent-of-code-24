import { TestInput } from '../lib/TestInput';
import path from 'node:path';
import { solve } from './06b';

describe('Day Six, Problem B', () => {
    const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
    const testInput = TestInput.fromFile(TEST_INPUT_FILE);

    test('test input is correct', () => {
        expect(testInput.lines().length).toBe(10);
    });

    test('solution is correct', () => {
        expect(solve(testInput)).toBe('6');
    });
});
