import { TestInput } from '../lib/TestInput';

export function solve(input: TestInput): string {
    const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
    let doFlag = true;

    return input
        .reduce((acc, line) => {
            let match;
            while ((match = regex.exec(line.getContent())) !== null) {
                if (match[0] === 'do()') {
                    doFlag = true;
                }

                if (match[0] === "don't()") {
                    doFlag = false;
                }

                if (doFlag && match[0].startsWith('mul')) {
                    acc += parseInt(match[1], 10) * parseInt(match[2], 10);
                }
            }

            return acc;
        }, 0)
        .toString();
}
