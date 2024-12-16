import { TestInput } from '../lib/TestInput';
import path from 'node:path';
import { RULES_LIST, solve } from './11a';
import { RulesEngine } from '../lib/RulesEngine';

describe('Day Eleven, Problem A', () => {
    const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
    const testInput = TestInput.fromFile(TEST_INPUT_FILE);

    test('test input is correct', () => {
        expect(testInput.lines().length).toBe(1);
    });

    test('generation 1', () => {
        const rulesEngine = new RulesEngine(RULES_LIST);
        const input = [125, 17];
        const generation = rulesEngine.apply(input);
        expect(generation).toStrictEqual([253000, 1, 7]);
    });

    test('generation 2', () => {
        const rulesEngine = new RulesEngine(RULES_LIST);
        const input = [253000, 1, 7];
        const generation = rulesEngine.apply(input);
        expect(generation).toStrictEqual([253, 0, 2024, 14168]);
    });

    test('generation 3', () => {
        const rulesEngine = new RulesEngine(RULES_LIST);
        const input = [253, 0, 2024, 14168];
        const generation = rulesEngine.apply(input);
        expect(generation).toStrictEqual([512072, 1, 20, 24, 28676032]);
    });

    test('generation 4', () => {
        const rulesEngine = new RulesEngine(RULES_LIST);
        const input = [512072, 1, 20, 24, 28676032];
        const generation = rulesEngine.apply(input);
        expect(generation).toStrictEqual([512, 72, 2024, 2, 0, 2, 4, 2867, 6032]);
    });

    test('generation 5', () => {
        const rulesEngine = new RulesEngine(RULES_LIST);
        const input = [512, 72, 2024, 2, 0, 2, 4, 2867, 6032];
        const generation = rulesEngine.apply(input);
        expect(generation).toStrictEqual([1036288, 7, 2, 20, 24, 4048, 1, 4048, 8096, 28, 67, 60, 32]);
    });

    test('generation 6', () => {
        const rulesEngine = new RulesEngine(RULES_LIST);
        const input = [1036288, 7, 2, 20, 24, 4048, 1, 4048, 8096, 28, 67, 60, 32];
        const generation = rulesEngine.apply(input);
        expect(generation).toStrictEqual([
            2097446912, 14168, 4048, 2, 0, 2, 4, 40, 48, 2024, 40, 48, 80, 96, 2, 8, 6, 7, 6, 0, 3, 2,
        ]);
    });

    test('solution is correct', () => {
        expect(solve(testInput)).toBe('55312');
    });
});
