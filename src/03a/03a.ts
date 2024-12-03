import { TestInput } from "../lib/TestInput";

export function solve(input: TestInput): string {
    return input.reduce((acc, line) => {
        const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;

        let match;
        while ((match = regex.exec(line.getContent())) !== null) {
            acc += parseInt(match[1]) * parseInt(match[2]);
        }

        return acc;
    }, 0).toString();
}