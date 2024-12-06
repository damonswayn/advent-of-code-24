import { TestInput } from '../lib/TestInput';

export function solve(input: TestInput): string {
    const data = input.asMultiDimensionalArray();
    return findOccurencesOfWordInGrid(data, 'XMAS').toString();
}

function findOccurencesOfWordInGrid(grid: string[][], word: string): number {
    const coordinatesSet = new Set<string>();

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === word[0]) {
                const coordinates = getListOfCoordinatesForWordInGridGivenStartingPoint(grid, word, [x, y]);
                if (coordinates.length > 0) {
                    for (const coordinate of coordinates) {
                        coordinatesSet.add(coordinate.toString());
                    }
                }
            }
        }
    }

    return coordinatesSet.size;
}

function getListOfCoordinatesForWordInGridGivenStartingPoint(
    grid: string[][],
    word: string,
    startingPoint: [number, number],
): [number, number][][] {
    const coordinates: [number, number][][] = [];
    const [x, y] = startingPoint;

    if (word.length === 1) {
        return [[[x, y]]];
    }

    const wordToFind = word.slice(1);
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
        [0, -1],
        [-1, 0],
        [-1, -1],
        [-1, 1],
    ];

    for (const [dx, dy] of directions) {
        const newCoordinates: [number, number][] = [[x, y]];
        let found = true;

        for (let i = 0; i < wordToFind.length; i++) {
            const newX = x + dx * (i + 1);
            const newY = y + dy * (i + 1);

            if (newX < 0 || newX >= grid[0].length || newY < 0 || newY >= grid.length) {
                found = false;
                break;
            }

            if (grid[newY][newX] !== wordToFind[i]) {
                found = false;
                break;
            }

            newCoordinates.push([newX, newY]);
        }

        if (found) {
            coordinates.push(newCoordinates);
        }
    }

    return coordinates;
}
