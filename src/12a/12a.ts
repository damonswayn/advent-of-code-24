import { TestInput } from '../lib/TestInput';

interface Plot {
    type: string;
    visited: boolean;
}

interface Region {
    type: string;
    area: number;
    perimeter: number;
}

function parseMap(input: string[]): Plot[][] {
    return input.map((line) => line.split('').map((char) => ({ type: char, visited: false })));
}

function isValid(x: number, y: number, map: Plot[][]): boolean {
    return x >= 0 && y >= 0 && x < map.length && y < map[0].length;
}

function floodFill(map: Plot[][], x: number, y: number, type: string): Region {
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    const stack = [[x, y]];
    let area = 0;
    let perimeter = 0;

    while (stack.length > 0) {
        const [cx, cy] = stack.pop()!;
        if (!isValid(cx, cy, map) || map[cx][cy].visited || map[cx][cy].type !== type) {
            continue;
        }

        map[cx][cy].visited = true;
        area++;

        for (const [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;
            if (!isValid(nx, ny, map) || map[nx][ny].type !== type) {
                perimeter++;
            } else if (!map[nx][ny].visited) {
                stack.push([nx, ny]);
            }
        }
    }

    return { type, area, perimeter };
}

function calculateTotalPrice(map: Plot[][]): number {
    const regions: Region[] = [];
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            if (!map[x][y].visited) {
                const region = floodFill(map, x, y, map[x][y].type);
                regions.push(region);
            }
        }
    }

    return regions.reduce((total, region) => total + region.area * region.perimeter, 0);
}

export function solve(input: TestInput): string {
    const map = parseMap(input.rawLines());
    const totalPrice = calculateTotalPrice(map);
    return totalPrice.toString();
}
