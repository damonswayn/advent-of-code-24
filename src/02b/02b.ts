import { isValidList } from "../02a/02a";
import { TestInput } from "../lib/TestInput";

export function solve(input: TestInput): string {
    return input.reduce((acc, val) => {
        const line = val.splitNumbersWhitespace();
        if (isValidList(line)) {
            return acc + 1;
        }

        for (let i = 0; i < line.length; i++) {
            const subList = removeIndexFromList(line, i);
            if (isValidList(subList)) {
                return acc + 1;
            }
        }

        return acc;
    }, 0).toString();
}

function removeIndexFromList(list: number[], index: number): number[] {
    return list.filter((_, i) => i !== index);
}