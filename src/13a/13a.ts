import { TestInput, TestInputLine } from '../lib/TestInput';

interface Button {
    x: number;
    y: number;
}

interface Prize {
    x: number;
    y: number;
}

interface Batch {
    buttonA: Button;
    buttonB: Button;
    prize: Prize;
}

export function solve(input: TestInput): string {
    const batches = input.batchByParagraph();
    const results = batches.map((batch) => solveBatch(batch));
    return results.reduce((acc, result) => acc + result, 0).toString();
}

function parseBatch(batch: TestInput): Batch {
    const lines = batch.lines();
    const buttonA = parseButton(lines[0]);
    const buttonB = parseButton(lines[1]);
    const prize = parsePrize(lines[2]);
    return { buttonA, buttonB, prize };
}

function parseButton(testInputLine: TestInputLine): Button {
    const regex = /Button\s[A|B]:\sX([+-]\d+),\sY([+-]\d+)/gi;
    const rawContent = testInputLine.getContent();
    const matches = regex.exec(rawContent);
    if (matches === null) {
        throw new Error(`Could not parse button from line: ${rawContent}`);
    }

    const x = parseInt(matches[1]);
    const y = parseInt(matches[2]);
    return { x, y };
}

function parsePrize(testInputLine: TestInputLine): Prize {
    const regex = /Prize: X=(\d+),\sY=(\d+)/gi;
    const rawContent = testInputLine.getContent();
    const matches = regex.exec(rawContent);
    if (matches === null) {
        throw new Error(`Could not parse prize from line: ${rawContent}`);
    }

    const x = parseInt(matches[1]);
    const y = parseInt(matches[2]);
    return { x, y };
}

function minClicksToPrice(batch: Batch): number {
    const aClicksXMultiplier = batch.buttonA.x * batch.buttonB.y;
    const aClicksYMultiplier = -(batch.buttonA.y * batch.buttonB.x);
    const prizeXMultiplied = batch.prize.x * batch.buttonB.y;
    const priceYMultiplied = -(batch.prize.y * batch.buttonB.x);

    const aClicksMultiplierCombined = aClicksXMultiplier + aClicksYMultiplier;
    const prizeMultipliedCombined = prizeXMultiplied + priceYMultiplied;

    const aClicks = prizeMultipliedCombined / aClicksMultiplierCombined;

    if (prizeMultipliedCombined % aClicksMultiplierCombined != 0) {
        return 0;
    }

    const bClicks = (batch.prize.x - batch.buttonA.x * aClicks) / batch.buttonB.x;

    if (bClicks != Math.floor(bClicks)) {
        return 0;
    }

    return aClicks * 3 + bClicks;
}

function solveBatch(batch: TestInput): number {
    const obj = parseBatch(batch);
    return minClicksToPrice(obj);
}
