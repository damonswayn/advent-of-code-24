import { TestInput, TestInputLine } from './TestInput';

export class GridSquare {
    private readonly x: number;

    private readonly y: number;

    private readonly value: string;

    constructor(x: number, y: number, value: string) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getValue(): string {
        return this.value;
    }

    public is(value: string): boolean {
        return this.value === value;
    }

    public equalCoords(other: GridSquare): boolean {
        return this.x === other.x && this.y === other.y;
    }

    public strictEqual(other: GridSquare): boolean {
        return this.equalCoords(other) && this.value === other.value;
    }
}

export class Grid {
    private readonly squares: GridSquare[][];

    private readonly width: number;

    private readonly height: number;

    public static fromTestInput(input: TestInput): Grid {
        const gridSquares: GridSquare[][] = [];
        input.lines().forEach((line: TestInputLine, y: number): void => {
            line.split('').forEach((value: string, x: number): void => {
                if (!gridSquares[x]) {
                    gridSquares[x] = [];
                }

                gridSquares[x][y] = new GridSquare(x, y, value);
            });
        });

        return new Grid(gridSquares);
    }

    public static fromString(input: string): Grid {
        return Grid.fromTestInput(new TestInput(input));
    }

    constructor(gridSquares: GridSquare[][]) {
        this.squares = gridSquares;
        this.width = this.squares.length;
        this.height = this.squares[0].length;
    }

    public getSquare(x: number, y: number): GridSquare {
        return this.squares[x][y];
    }

    public filter(predicate: (square: GridSquare) => boolean): GridSquare[] {
        return this.squares.reduce((acc: GridSquare[], row: GridSquare[]): GridSquare[] => {
            return acc.concat(row.filter(predicate));
        }, []);
    }

    public forEach(callback: (square: GridSquare) => void): void {
        this.squares.forEach((row: GridSquare[]): void => {
            row.forEach(callback);
        });
    }

    public isInBounds(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public clone(): Grid {
        return new Grid(this.squares.map((row: GridSquare[]) => row.map((square) => square)));
    }
}
