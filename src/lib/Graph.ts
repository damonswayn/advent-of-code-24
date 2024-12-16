import { TestInput } from './TestInput';

export class Graph<T> {
    private readonly _vertices: Vertex<T>[] = [];

    public static fromTestInput<T>(input: TestInput): Graph<T> {
        const lines = input.lines();
        const grid: number[][] = lines.map((line) => line.splitPerCharacterNumbers());
        const graph = new Graph<T>();

        const height = grid.length;
        const width = grid[0].length;

        const vertices: Vertex<T>[][] = [];

        for (let y = 0; y < height; y++) {
            vertices[y] = [];
            for (let x = 0; x < width; x++) {
                if (typeof grid[y][x] !== 'number') {
                    vertices[y][x] = new Vertex<T>(Number.MAX_SAFE_INTEGER as T, x, y);
                } else {
                    vertices[y][x] = new Vertex<T>(grid[y][x] as T, x, y);
                }

                vertices[y][x].setTag('coords', `(X: ${x.toString()}, Y: ${y.toString()})`);
                graph.addVertex(vertices[y][x]);
            }
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const currentVertex = vertices[y][x];
                const currentValue = grid[y][x];

                if (x + 1 < width) {
                    const rightVertex = vertices[y][x + 1];
                    graph.addEdge(currentVertex, rightVertex, grid[y][x + 1] - currentValue);
                }

                if (y + 1 < height) {
                    const downVertex = vertices[y + 1][x];
                    graph.addEdge(currentVertex, downVertex, grid[y + 1][x] - currentValue);
                }

                if (x - 1 >= 0) {
                    const leftVertex = vertices[y][x - 1];
                    graph.addEdge(currentVertex, leftVertex, grid[y][x - 1] - currentValue);
                }

                if (y - 1 >= 0) {
                    const upVertex = vertices[y - 1][x];
                    graph.addEdge(currentVertex, upVertex, grid[y - 1][x] - currentValue);
                }
            }
        }

        return graph;
    }

    public addVertex(vertex: Vertex<T>): void {
        this._vertices.push(vertex);
    }

    public addEdge(from: Vertex<T>, to: Vertex<T>, weight: number): void {
        const edge = new Edge<T>(from, to, weight);
        from.addEdge(edge);
    }

    public forEach(callback: (vertex: Vertex<T>) => void): void {
        this._vertices.forEach(callback);
    }

    public map<U>(callback: (vertex: Vertex<T>) => U): U[] {
        return this._vertices.map(callback);
    }

    public filter(callback: (vertex: Vertex<T>) => boolean): Vertex<T>[] {
        return this._vertices.filter(callback);
    }

    public doesPathExist(from: Vertex<T>, to: Vertex<T>, maximumEdgeWeight: number): boolean {
        const visited: Vertex<T>[] = [];
        return this.doesPathExistRecursive(from, to, visited, maximumEdgeWeight);
    }

    private doesPathExistRecursive(from: Vertex<T>, to: Vertex<T>, visited: Vertex<T>[], maximumEdgeWeight: number) {
        if (from.equals(to)) {
            return true;
        }

        visited.push(from);

        const edges = from.edges.filter((edge) => edge.weight === maximumEdgeWeight);

        for (const edge of edges) {
            if (!visited.includes(edge.to) && edge.to.value > from.value) {
                if (this.doesPathExistRecursive(edge.to, to, visited, maximumEdgeWeight)) {
                    return true;
                }
            }
        }

        return false;
    }

    countDistinctPaths(start: Vertex<T>, end: Vertex<T>, allowedStepSize: number) {
        const visited: Vertex<T>[] = [];
        return this.countDistinctPathsRecursive(start, end, visited, allowedStepSize);
    }

    private countDistinctPathsRecursive(
        start: Vertex<T>,
        end: Vertex<T>,
        visited: Vertex<T>[],
        allowedStepSize: number,
    ) {
        if (start.equals(end)) {
            return 1;
        }

        visited.push(start);

        let count = 0;
        for (const edge of start.edges) {
            if (!visited.includes(edge.to) && edge.to.value > start.value && edge.weight === allowedStepSize) {
                count += this.countDistinctPathsRecursive(edge.to, end, visited, allowedStepSize);
            }
        }

        visited.pop();
        return count;
    }
}

export class Vertex<T> {
    private readonly _value: T;

    private readonly _gridLocationX: number;

    private readonly _gridLocationY: number;

    private readonly _edges: Edge<T>[] = [];

    private readonly _tags: Map<string, string> = new Map<string, string>();

    constructor(value: T, gridLocationX: number, gridLocationY: number) {
        this._value = value;
        this._gridLocationX = gridLocationX;
        this._gridLocationY = gridLocationY;
        this._edges = [];
    }

    get value(): T {
        return this._value;
    }

    get gridLocationX(): number {
        return this._gridLocationX;
    }

    get gridLocationY(): number {
        return this._gridLocationY;
    }

    get edges(): Edge<T>[] {
        return this._edges;
    }

    addEdge(edge: Edge<T>): this {
        this._edges.push(edge);
        return this;
    }

    forEach(callback: (edge: Edge<T>) => void): void {
        this._edges.forEach(callback);
    }

    map<U>(callback: (edge: Edge<T>) => U): U[] {
        return this._edges.map(callback);
    }

    filter(callback: (edge: Edge<T>) => boolean): Edge<T>[] {
        return this._edges.filter(callback);
    }

    equals(vertex: Vertex<T>): boolean {
        return (
            this._value === vertex.value &&
            this._gridLocationX === vertex.gridLocationX &&
            this._gridLocationY === vertex.gridLocationY
        );
    }

    setTag(tag: string, value: string): this {
        this._tags.set(tag, value);
        return this;
    }

    toString(): string {
        return `(Value: ${this.value as string}, Tags: ${JSON.stringify(Array.from(this._tags.entries()))}, Edges: ${this.edges.map((edge) => edge.toString()).join(',')})`;
    }
}

export class Edge<T> {
    private readonly _from: Vertex<T>;
    private readonly _to: Vertex<T>;
    private readonly _weight: number;

    constructor(from: Vertex<T>, to: Vertex<T>, weight = 1) {
        this._from = from;
        this._to = to;
        this._weight = weight;
    }

    get from(): Vertex<T> {
        return this._from;
    }

    get to(): Vertex<T> {
        return this._to;
    }

    get weight(): number {
        return this._weight;
    }

    toString(): string {
        return `(From: ${this.from.value as string}, To: ${this.to.value as string}, Weight: ${this.weight.toString()})`;
    }
}
