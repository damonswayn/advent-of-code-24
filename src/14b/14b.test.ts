import { solve } from './14b';
import path from 'node:path';
import { TestInput } from '../lib/TestInput';

describe('Day Fourteen, Problem B', () => {
    const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
    const testInput = TestInput.fromFile(TEST_INPUT_FILE);

    test('Solution is correct', () => {
        expect(solve(testInput)).toBe('8050');
    });
});
