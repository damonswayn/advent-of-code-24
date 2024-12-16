import { TestInput } from '../lib/TestInput';

const generate = (value: number, generation: number, cache: Record<string, number> = {}): number => {
    if (cache[`${value.toString()},${generation.toString()}`])
        return cache[`${value.toString()},${generation.toString()}`];

    if (generation === 0) {
        return 1;
    }

    if (value === 0) {
        return generate(1, generation - 1, cache);
    }

    if (value.toString().length % 2 !== 0) {
        return generate(2024 * value, generation - 1, cache);
    }

    const n = value.toString();
    return (cache[`${value.toString()},${generation.toString()}`] =
        generate(parseInt(n.slice(0, n.length / 2)), generation - 1, cache) +
        generate(parseInt(n.slice(n.length / 2, n.length)), generation - 1, cache));
};

export function solve(input: TestInput): string {
    let len = 0;
    input.lines().forEach((line) => {
        len = line
            .splitNumbersWhitespace()
            .map((number) => generate(number, 75))
            .reduce((sum, numStones) => sum + numStones, 0);
    });

    return len.toString();
}
