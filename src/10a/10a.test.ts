import { TestInput } from '../lib/TestInput';
import path from 'node:path';
import { solve } from './10a';

describe('Day Ten, Problem A', () => {
    const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
    const testInput = TestInput.fromFile(TEST_INPUT_FILE);

    test('test input is correct', () => {
        expect(testInput.lines().length).toBe(8);
    });

    test('Test case one', () => {
        const input = TestInput.fromString(`...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9
`);

        expect(solve(input)).toBe('2');
    });

    test('Test case two', () => {
        const input = TestInput.fromString(`..90..9
...1.98
...2..7
6543456
765.987
876....
987....`);

        expect(solve(input)).toBe('4');
    });

    test('Test case three', () => {
        const input = TestInput.fromString(`10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`);

        expect(solve(input)).toBe('3');
    });

    test('solution is correct', () => {
        expect(solve(testInput)).toBe('36');
    });
});
