import { TestInput } from '../lib/TestInput';
import Tuple from '../lib/Tuple';

export function solve(input: TestInput): string {
    const chunks = input.asNewlineSeperatedChunks();
    const dependencyList = chunks[0];
    const printQueueLists = chunks[1];
    const printQueueArrays = printQueueLists.map((line) => line.splitNumbers(','));
    const dependencyTuples = dependencyList.map((line) => {
        const nums = line.splitNumbers('|');
        return new Tuple(nums[0], nums[1]);
    });

    let sum = 0;
    for (const printQueue of printQueueArrays) {
        const pageToIndexMap = new Map();
        for (const [index, page] of printQueue.entries()) {
            pageToIndexMap.set(page, index);
        }

        let correct = true;
        for (const rule of dependencyTuples) {
            if (pageToIndexMap.get(rule.a) > pageToIndexMap.get(rule.b)) {
                correct = false;
                break;
            }
        }

        if (correct) {
            sum += printQueue[Math.floor(printQueue.length / 2)];
        }
    }

    return sum.toString();
}
