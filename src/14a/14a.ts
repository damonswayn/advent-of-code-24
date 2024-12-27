import { TestInput, TestInputLine } from '../lib/TestInput';
import { SimplePoint2D } from '../lib/Coords';

interface AbstractGrid {
    width: number;
    height: number;
}

interface RobotPosition {
    position: SimplePoint2D;
    velocity: SimplePoint2D;
}

export const DEFAULT_GRID: AbstractGrid = {
    width: 101,
    height: 103,
};

const DEFAULT_TICKS = 100;

export function solve(input: TestInput, grid: AbstractGrid | null = null, ticks: number | null = null): string {
    const positions = input.lines().map(parseLineMapper);
    return internalSolve(positions, grid ?? DEFAULT_GRID, ticks ?? DEFAULT_TICKS);
}

function parseLineMapper(line: TestInputLine): RobotPosition {
    const regex = /p=(-?\d+),(-?\d+)\sv=(-?\d+),(-?\d+)/gim;
    const matches = regex.exec(line.getContent());
    if (matches === null) {
        throw new Error(`Could not parse line: ${line.getContent()}`);
    }

    return {
        position: { x: parseInt(matches[1]), y: parseInt(matches[2]) },
        velocity: { x: parseInt(matches[3]), y: parseInt(matches[4]) },
    };
}

export function internalSolve(positions: RobotPosition[], grid: AbstractGrid, ticks: number): string {
    const verticalSplit = Math.floor(grid.width / 2);
    const horizontalSplit = Math.floor(grid.height / 2);

    let quadrantA = 0;
    let quadrantB = 0;
    let quadrantC = 0;
    let quadrantD = 0;

    positions.forEach((position) => {
        const skipX = position.position.x + ticks * position.velocity.x;
        const skipY = position.position.y + ticks * position.velocity.y;

        let finalX = skipX % grid.width;
        if (finalX < 0) {
            finalX += grid.width;
        }

        let finalY = skipY % grid.height;
        if (finalY < 0) {
            finalY += grid.height;
        }

        if (finalX === verticalSplit || finalY === horizontalSplit) {
            return;
        }

        if (finalX < verticalSplit) {
            if (finalY < horizontalSplit) {
                quadrantA += 1;
            } else {
                quadrantC += 1;
            }
        } else {
            if (finalY < horizontalSplit) {
                quadrantB += 1;
            } else {
                quadrantD += 1;
            }
        }
    });

    return (quadrantA * quadrantB * quadrantC * quadrantD).toString();
}
