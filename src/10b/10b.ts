import { TestInput } from '../lib/TestInput';
import { Graph } from '../lib/Graph';

export function solve(input: TestInput): string {
    const graph = Graph.fromTestInput<number>(input);
    const startPoints = graph.filter((vertex) => vertex.value === 0);
    const endPoints = graph.filter((vertex) => vertex.value === 9);

    const scores: number[] = [];
    for (const start of startPoints) {
        for (const end of endPoints) {
            scores.push(graph.countDistinctPaths(start, end, 1));
        }
    }

    return scores.reduce((acc, score) => acc + score, 0).toString();
}
