import { TestInput } from '../lib/TestInput';
import { Grid, GridSquare } from '../lib/Grid';

export class AntiNode {
    constructor(
        private readonly x: number,
        private readonly y: number,
    ) {}

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public toString(): string {
        return `(${this.x.toString()}, ${this.y.toString()})`;
    }
}

export type GroupNodeByTypeAccumulatorFunc = (
    accum: Map<string, GridSquare[]>,
    node: GridSquare,
) => Map<string, GridSquare[]>;
export type GroupedNodesMap = Map<string, GridSquare[]>;
export const groupNodesByType: GroupNodeByTypeAccumulatorFunc = (
    accum: GroupedNodesMap,
    node: GridSquare,
): GroupedNodesMap => {
    if (!accum.has(node.getValue())) {
        accum.set(node.getValue(), []);
    }

    accum.get(node.getValue())?.push(node);
    return accum;
};

export function solve(input: TestInput): string {
    const antinodes = new Set<string>();
    const grid = Grid.fromTestInput(input);

    const nodes = grid.filter((square: GridSquare) => !square.is('.'));
    const groupedNodes = nodes.reduce(groupNodesByType, new Map<string, GridSquare[]>());

    groupedNodes.forEach((nodes: GridSquare[]): void => {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const node1 = nodes[i];
                const node2 = nodes[j];

                const yDiff = node1.getY() - node2.getY();
                const xDiff = node1.getX() - node2.getX();

                const antiNodeA = new AntiNode(node1.getX() + xDiff, node1.getY() + yDiff);
                const antiNodeB = new AntiNode(node2.getX() - xDiff, node2.getY() - yDiff);

                if (grid.isInBounds(antiNodeA.getX(), antiNodeA.getY())) {
                    antinodes.add(antiNodeA.toString());
                }

                if (grid.isInBounds(antiNodeB.getX(), antiNodeB.getY())) {
                    antinodes.add(antiNodeB.toString());
                }
            }
        }
    });

    return antinodes.size.toString();
}
