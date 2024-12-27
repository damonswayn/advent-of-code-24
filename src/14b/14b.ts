import { TestInput, TestInputLine } from '../lib/TestInput';
import { SimplePoint2D } from '../lib/Coords';

interface AbstractGrid {
    width: number;
    height: number;
    grid: string[][];
}

interface RobotPosition {
    position: SimplePoint2D;
    velocity: SimplePoint2D;
}

function makeGrid(width: number, height: number): string[][] {
    const grid = new Array(height);
    for (let i = 0; i < height; i++) {
        grid[i] = new Array(width).fill('0');
    }

    return grid as string[][];
}

export const DEFAULT_GRID: AbstractGrid = {
    width: 101,
    height: 103,
    grid: makeGrid(101, 103),
};

export function solve(input: TestInput, grid: AbstractGrid | null = null): string {
    const positions = input.lines().map(parseLineMapper);
    return internalSolve(positions, grid ?? DEFAULT_GRID);
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

export function internalSolve(positions: RobotPosition[], grid: AbstractGrid): string {
    let ticks = 0;
    while (true) {
        ticks += 1;
        if (ticks > 10000) {
            throw new Error('Too many ticks');
        }

        let collision = false;
        for (const robot of positions) {
            collision = moveRobotAndCheckForColisions(robot, grid, ticks);
            if (collision) {
                break;
            }
        }

        if (!collision) {
            printSolutionAsVisualisation(grid, ticks);
            return ticks.toString();
        }
    }
}

function moveRobotAndCheckForColisions(position: RobotPosition, grid: AbstractGrid, ticks: number): boolean {
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

    if (grid.grid[finalY][finalX] === ticks.toString()) {
        return true;
    }

    grid.grid[finalY][finalX] = ticks.toString();
    return false;
}

function printSolutionAsVisualisation(grid: AbstractGrid, ticks: number): void {
    for (let i = 0; i < grid.height; i++) {
        for (let j = 0; j < grid.width; j++) {
            if (grid.grid[i][j] === ticks.toString()) {
                grid.grid[i][j] = 'X';
            } else {
                grid.grid[i][j] = '.';
            }
        }
    }

    grid.grid.forEach((row) => {
        console.log(row.join(''));
    });
}
