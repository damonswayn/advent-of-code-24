import { TestInput } from '../lib/TestInput';
import path from 'node:path';
import { Line, parseLine } from '../07a/07a';
import { rulesB, solve } from './07b';

describe('Day XXX, Problem A', () => {
    const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
    const testInput = TestInput.fromFile(TEST_INPUT_FILE);

    test('test input is correct', () => {
        expect(testInput.lines().length).toBe(9);
    });

    test('evaluate gives correct answer with concat rules', () => {
        const line = new Line(156, [15, 6]);
        expect(line.isSolvable(rulesB)).toBe(true);
    });

    test('Should be six solvable lines', () => {
        const lines = testInput.map(parseLine);
        expect(lines.filter((line) => line.isSolvable(rulesB)).length).toBe(6);
    });

    test('solution is correct', () => {
        expect(solve(testInput)).toBe('11387');
    });
});
