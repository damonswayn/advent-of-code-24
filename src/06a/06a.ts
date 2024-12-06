import { TestInput, TestInputLine } from '../lib/TestInput';

class MapSquare {
    private readonly posX: number;
    private readonly posY: number;
    private readonly type: string;

    constructor(x: number, y: number, type: string) {
        this.posX = x;
        this.posY = y;
        this.type = type;
    }

    public isWall(): boolean {
        return this.type === '#';
    }

    public isStart(): boolean {
        return this.type === '^' || this.type === '>' || this.type === 'v' || this.type === '<';
    }

    public get x(): number {
        return this.posX;
    }

    public get y(): number {
        return this.posY;
    }

    public get direction(): Direction {
        if (!this.isStart()) {
            throw new Error('Not a start square');
        }

        switch (this.type) {
            case '^':
                return Direction.UP;
            case '>':
                return Direction.RIGHT;
            case 'v':
                return Direction.DOWN;
            case '<':
                return Direction.LEFT;
            default:
                throw new Error('Not a start square');
        }
    }
}

class Map {
    private readonly map: MapSquare[][];

    private guard: Guard;

    private visited: Set<string>;
    private visitedSquares: number;
    private numberOfSteps: number;

    public static fromInput(input: TestInput): Map {
        const map: (MapSquare[] | undefined)[] = [];

        input.forEach((line: TestInputLine, y: number) => {
            line.split('').forEach((char: string, x: number) => {
                if (map[y] === undefined) {
                    map[y] = [];
                }

                map[y][x] = new MapSquare(x, y, char);
            });
        });

        return new Map(map as MapSquare[][]);
    }

    constructor(map: MapSquare[][]) {
        this.map = map;
        this.guard = new Guard(this.start.x, this.start.y, this.start.direction);
        this.visited = new Set<string>();
        this.visitedSquares = 0;
        this.numberOfSteps = 0;
    }

    public get(x: number, y: number): MapSquare | null {
        if (y < 0 || y >= this.map.length) {
            return null;
        }

        if (x < 0 || x >= this.map[y].length) {
            return null;
        }

        return this.map[y][x];
    }

    public get start(): MapSquare {
        return this.map.reduce((acc: MapSquare[], row: MapSquare[]) => {
            return acc.concat(row.filter((square: MapSquare) => square.isStart()));
        }, [])[0];
    }

    public peek(x: number, y: number, direction: Direction): MapSquare | null {
        switch (direction) {
            case Direction.UP:
                return this.get(x, y - 1);
            case Direction.RIGHT:
                return this.get(x + 1, y);
            case Direction.DOWN:
                return this.get(x, y + 1);
            case Direction.LEFT:
                return this.get(x - 1, y);
        }
    }

    public tick(): boolean {
        const nextSquare = this.peek(this.guard.getX(), this.guard.getY(), this.guard.getDirection());

        if (nextSquare === null) {
            return false;
        } else if (nextSquare.isWall()) {
            this.guard.turnClockwise();
        } else {
            this.guard.step();
            this.visited.add(this.guard.getPositionAsString());
            this.numberOfSteps++;
            this.visitedSquares = this.visited.size;
        }

        // check for an infinite loop for my own sanity
        if (this.numberOfSteps - this.visitedSquares > 10000) {
            throw new Error('Infinite loop detected');
        }

        return true;
    }

    public getNumberOfVisitedSquares(): number {
        return this.visited.size;
    }
}

enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT,
}

class Guard {
    private x: number;
    private y: number;
    private direction: Direction;

    constructor(x: number, y: number, direction: Direction = Direction.UP) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getDirection(): Direction {
        return this.direction;
    }

    public getPositionAsString(): string {
        return `${this.x.toString()},${this.y.toString()}`;
    }

    public move(direction: Direction): void {
        switch (direction) {
            case Direction.UP:
                this.y--;
                this.direction = Direction.UP;
                break;
            case Direction.RIGHT:
                this.x++;
                this.direction = Direction.RIGHT;
                break;
            case Direction.DOWN:
                this.y++;
                this.direction = Direction.DOWN;
                break;
            case Direction.LEFT:
                this.x--;
                this.direction = Direction.LEFT;
                break;
        }
    }

    public step(): void {
        this.move(this.direction);
    }

    public turnClockwise(): void {
        switch (this.direction) {
            case Direction.UP:
                this.direction = Direction.RIGHT;
                break;
            case Direction.RIGHT:
                this.direction = Direction.DOWN;
                break;
            case Direction.DOWN:
                this.direction = Direction.LEFT;
                break;
            case Direction.LEFT:
                this.direction = Direction.UP;
                break;
        }
    }
}

export function solve(input: TestInput): string {
    const map = Map.fromInput(input);

    while (map.tick()) {
        // do nothing
    }

    return map.getNumberOfVisitedSquares().toString();
}
