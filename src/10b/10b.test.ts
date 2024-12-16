import { TestInput } from '../lib/TestInput';
import path from 'node:path';
import { solve } from './10b';

describe('Day Ten, Problem B', () => {
    const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
    const testInput = TestInput.fromFile(TEST_INPUT_FILE);

    test('test input is correct', () => {
        expect(testInput.lines().length).toBe(7);
    });

    test('test case 1', () => {
        const input = TestInput.fromString(`.....0.
..4321.
..5....
..6....
..7....
..8....
..9....`);

        expect(solve(input)).toBe('1');
    });

    test('test case 2', () => {
        const input = TestInput.fromString(`..90..9
...1.98
...2..7
6543456
765.987
876....
987....`);

        expect(solve(input)).toBe('13');
    });

    test('test case 3', () => {
        const input = TestInput.fromString(`012345
123456
234567
345678
4.6789
56789.`);

        expect(solve(input)).toBe('227');
    });

    test('test case 4', () => {
        const input = TestInput.fromString(`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`);

        expect(solve(input)).toBe('81');
    });

    test('solution is correct', () => {
        expect(solve(testInput)).toBe('3');
    });
});
