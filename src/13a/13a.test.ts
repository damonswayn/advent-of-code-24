import { TestInput } from '../lib/TestInput';
import path from 'node:path';
import { solve } from './13a';

describe('Day Thirteen, Problem A', () => {
    const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
    const testInput = TestInput.fromFile(TEST_INPUT_FILE);

    test('test input is correct', () => {
        expect(testInput.lines().length).toBe(15);
    });

    test('Batch 1', () => {
        const batch = TestInput.fromString(`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400`);

        expect(solve(batch)).toBe('280');
    });

    test('Batch 2', () => {
        const batch = TestInput.fromString(`Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176`);

        expect(solve(batch)).toBe('0');
    });

    test('Batch 3', () => {
        const batch = TestInput.fromString(`Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450`);

        expect(solve(batch)).toBe('200');
    });

    test('Batch 4', () => {
        const batch = TestInput.fromString(`Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`);

        expect(solve(batch)).toBe('0');
    });

    test('solution is correct', () => {
        expect(solve(testInput)).toBe('480');
    });
});
