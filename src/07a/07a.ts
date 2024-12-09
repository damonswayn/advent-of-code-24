import { TestInput, TestInputLine } from '../lib/TestInput';

export type RuleFunc = (a: number, b: number) => number;
const ruleAdd: RuleFunc = (a: number, b: number): number => a + b;
const ruleMul: RuleFunc = (a: number, b: number): number => a * b;

export const rules = [ruleAdd, ruleMul];

export const evaluate = (tempResult: number, rest: number[], answer: number, rules: RuleFunc[]): boolean => {
    if (rest.length === 0) {
        return tempResult === answer;
    }

    return rules.some((rule) => {
        const next = rest[0];
        const newTempResult = rule(tempResult, next);

        if (newTempResult <= answer) {
            return evaluate(newTempResult, rest.slice(1), answer, rules);
        }

        return false;
    });
};

export class Line {
    constructor(
        private readonly target: number,
        private readonly numbers: number[],
    ) {}

    isSolvable(rulesList: RuleFunc[]): boolean {
        return evaluate(this.numbers[0], this.numbers.slice(1), this.target, rulesList);
    }

    public getSolution(): number {
        return this.target;
    }

    toString(): string {
        return `${this.target.toString()}: ${this.numbers.join(' ')}`;
    }
}

export function solve(input: TestInput): string {
    const lines = input.map(parseLine);
    return lines
        .filter((line) => line.isSolvable(rules))
        .reduce((accum: number, line: Line) => accum + line.getSolution(), 0)
        .toString();
}

export function parseLine(line: TestInputLine): Line {
    const split = line.split(':');
    const numbers = split[1]
        .trim()
        .split(' ')
        .map((n) => parseInt(n));

    return new Line(parseInt(split[0]), numbers);
}
