import { TestInput } from '../lib/TestInput';
import { IRule, RulesEngine } from '../lib/RulesEngine';

class RuleOne implements IRule {
    applies(input: number): boolean {
        return input === 0;
    }

    apply(input: number, index: number, data: number[]): number[] {
        data[index] = 1;
        return data;
    }
}

class RuleTwo implements IRule {
    applies(input: number): boolean {
        const stringified = input.toString();
        return stringified.length % 2 === 0;
    }

    apply(input: number, index: number, data: number[]): number[] {
        const [firstHalf, secondHalf] = this.splitStringInHalf(input);
        data[index] = parseInt(firstHalf);
        data.splice(index + 1, 0, parseInt(secondHalf));
        return data;
    }

    private splitStringInHalf(input: number): [string, string] {
        const stringified = input.toString();
        const half = Math.floor(stringified.length / 2);
        return [stringified.substring(0, half), stringified.substring(half)];
    }
}

class RuleThree implements IRule {
    applies(): boolean {
        return true;
    }

    apply(input: number, index: number, data: number[]): number[] {
        data[index] = input * 2024;
        return data;
    }
}

export const RULES_LIST = [new RuleOne(), new RuleTwo(), new RuleThree()];

export function solve(input: TestInput): string {
    const GENERATIONS = 25;
    const rulesEngine = new RulesEngine(RULES_LIST);
    let result = 0;
    input.lines().forEach((line) => {
        const input = line.splitNumbersWhitespace();
        let generation = input.slice();
        for (let i = 0; i < GENERATIONS; i++) {
            generation = rulesEngine.apply(generation);
        }

        result = generation.length;
    });

    return result.toString();
}
