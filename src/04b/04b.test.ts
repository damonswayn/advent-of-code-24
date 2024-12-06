import { TestInput } from '../lib/TestInput';
import path from 'node:path';
import { solve } from './04b';

describe('Day Four, Problem B', () => {
    const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
    const testInput = TestInput.fromFile(TEST_INPUT_FILE);

    test('test input is correct', () => {
        expect(testInput.lines().length).toBe(10);
    });

    test('expect to find 1 X within the given grid', () => {
        const test = TestInput.fromString(`MMS
MAS
MMS`);
        expect(solve(test)).toBe('1');
    });

    test('expect to find 0 X within the given grid', () => {
        const test = TestInput.fromString(`MMS
MMS
MMS`);
        expect(solve(test)).toBe('0');
    });

    test('expect to find 1 X within the given grid', () => {
        const test = TestInput.fromString(`SMM
SAM
SMM`);
        expect(solve(test)).toBe('1');
    });

    test('Expect to find 4 X within the given grid', () => {
        const test = TestInput.fromString(`SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`);

        expect(solve(test)).toBe('4');
    });

    test('Expect to find 5 X within the given grid', () => {
        const test = TestInput.fromString(`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA`);

        expect(solve(test)).toBe('5');
    });

    test('solution is correct', () => {
        expect(solve(testInput)).toBe('9');
    });
});
