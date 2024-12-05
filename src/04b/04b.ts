import {TestInput} from '../lib/TestInput';

const MATRIX_ROTATIONS = [
  [
    ['M', null, 'M'],
    [null, 'A', null],
    ['S', null, 'S'],
  ],
  [
    ['S', null, 'M'],
    [null, 'A', null],
    ['S', null, 'M'],
  ],
  [
    ['S', null, 'S'],
    [null, 'A', null],
    ['M', null, 'M'],
  ],
  [
    ['M', null, 'S'],
    [null, 'A', null],
    ['M', null, 'S'],
  ],
]

export function solve(input: TestInput): string {
  const data = input.asMultiDimensionalArray();
  // count the number of times the given matrices appear in the grid
  return countMatrixAppearances(data).toString();
}

function countMatrixAppearances(grid: string[][]): number {
  let count = 0;
  for (const matrix of MATRIX_ROTATIONS) {
    count += countMatrixAppearancesInGrid(grid, matrix);
  }
  return count;
}

function countMatrixAppearancesInGrid(grid: string[][], matrix: (string|null)[][]): number {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === matrix[0][0]) {
        if (isMatrixInGrid(grid, matrix, [x, y])) {
          count++;
        }
      }
    }
  }
  return count;
}

function isMatrixInGrid(grid: string[][], matrix: (string|null)[][], startingPoint: [number, number]): boolean {
  const [x, y] = startingPoint;
  for (let dy = 0; dy < matrix.length; dy++) {
    for (let dx = 0; dx < matrix[dy].length; dx++) {
      const gridX = x + dx;
      const gridY = y + dy;
      if (gridY >= grid.length || gridX >= grid[0].length) {
        return false;
      }
      if (matrix[dy][dx] !== null && matrix[dy][dx] !== grid[gridY][gridX]) {
        return false;
      }
    }
  }
  return true;
}