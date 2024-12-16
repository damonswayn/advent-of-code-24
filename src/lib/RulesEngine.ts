export class RulesEngine {
    private readonly rules: IRule[];

    constructor(rules: IRule[]) {
        this.rules = rules;
    }

    public addRule(rule: IRule): this {
        this.rules.push(rule);
        return this;
    }

    apply(input: number[]): number[] {
        let generation = input.slice();
        for (let idx = 0; idx < input.length; idx++) {
            const i = input[idx];
            const genIdx = generation.indexOf(i, idx);
            for (const rule of this.rules) {
                if (rule.applies(i, generation)) {
                    generation = rule.apply(i, genIdx, generation);
                    break;
                }
            }
        }

        return generation;
    }
}

export interface IRule {
    applies(input: number, data: number[]): boolean;

    apply(input: number, index: number, data: number[]): number[];
}
