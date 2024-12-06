import { TestInput } from '../lib/TestInput';

export function solve(input: TestInput): string {
    return input
        .reduce((acc, val): number => {
            const line = val.splitNumbersWhitespace();
            if (isValidList(line)) {
                return acc + 1;
            }

            return acc;
        }, 0)
        .toString();
}

function isIncrementingList(list: number[]): boolean {
    for (let i = 1; i < list.length; i++) {
        if (list[i] < list[i - 1]) {
            return false;
        }
    }

    return true;
}

function isDecrementingList(list: number[]): boolean {
    for (let i = 1; i < list.length; i++) {
        if (list[i] > list[i - 1]) {
            return false;
        }
    }

    return true;
}

function isStepInBounds(numA: number, numB: number, stepMin: number, stepMax: number): boolean {
    const step = Math.abs(numA - numB);
    return step >= stepMin && step <= stepMax;
}

export function isValidList(line: number[]): boolean {
    const isIncrementingOrDecrementingList = isIncrementingList(line) || isDecrementingList(line);
    if (isIncrementingOrDecrementingList) {
        let isValid = true;
        for (let i = 1; i < line.length; i++) {
            if (!isStepInBounds(line[i], line[i - 1], 1, 3)) {
                isValid = false;
                break;
            }
        }

        return isValid;
    }

    return false;
}
