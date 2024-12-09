import { TestInput } from '../lib/TestInput';
import { Grid, GridSquare } from '../lib/Grid';
import { AntiNode, groupNodesByType } from '../08a/08a';

export function solve(input: TestInput): string {
    const antiNodes = new Set<string>();
    const grid = Grid.fromTestInput(input);

    const nodes = grid.filter((square: GridSquare) => !square.is('.'));
    const groupedNodes = nodes.reduce(groupNodesByType, new Map<string, GridSquare[]>());

    groupedNodes.forEach((nodes: GridSquare[]) => {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const node1 = nodes[i];
                const node2 = nodes[j];

                const yDiff = node1.getY() - node2.getY();
                const xDiff = node1.getX() - node2.getX();

                let stillInBounds = true;
                for (let k = 0; stillInBounds; k++) {
                    const antiNodeA = new AntiNode(node1.getX() + k * xDiff, node1.getY() + k * yDiff);
                    if (!grid.isInBounds(antiNodeA.getX(), antiNodeA.getY())) {
                        stillInBounds = false;
                    } else {
                        antiNodes.add(antiNodeA.toString());
                    }
                }

                stillInBounds = true;
                for (let k = 0; stillInBounds; k++) {
                    const antiNodeB = new AntiNode(node2.getX() - k * xDiff, node2.getY() - k * yDiff);
                    if (!grid.isInBounds(antiNodeB.getX(), antiNodeB.getY())) {
                        stillInBounds = false;
                    } else {
                        antiNodes.add(antiNodeB.toString());
                    }
                }
            }
        }
    });

    return antiNodes.size.toString();
}
