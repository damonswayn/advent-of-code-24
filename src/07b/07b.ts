import { TestInput } from '../lib/TestInput';
import { Line, parseLine, RuleFunc, rules } from '../07a/07a';

const ruleConcat: RuleFunc = (a: number, b: number): number => parseInt(`${a.toString()}${b.toString()}`);
export const rulesB = rules.concat(ruleConcat);

export function solve(input: TestInput): string {
    const lines = input.map(parseLine);
    return lines
        .filter((line) => line.isSolvable(rulesB))
        .reduce((accum: number, line: Line) => accum + line.getSolution(), 0)
        .toString();
}
