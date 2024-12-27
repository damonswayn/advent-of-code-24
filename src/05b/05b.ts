import { TestInput } from '../lib/TestInput';
import Tuple from '../lib/Tuple';

export function solve(input: TestInput): string {
    const chunks = input.batchByParagraph();
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

        if (!correct) {
            const appliedRules: Tuple[] = [];
            for (const rule of dependencyTuples) {
                if (printQueue.find((page) => page === rule.a) && printQueue.find((page) => page === rule.b)) {
                    appliedRules.push(rule);
                }
            }

            const pageToPagesAfterMap = new Map<number, number[]>();
            for (const appliedRule of appliedRules) {
                pageToPagesAfterMap.set(
                    appliedRule.a,
                    pageToPagesAfterMap.has(appliedRule.a)
                        ? [...pageToPagesAfterMap.get(appliedRule.a)!, appliedRule.b]
                        : [appliedRule.b],
                );
            }

            printQueue.sort((a: number, b: number): number => {
                const afterA = pageToPagesAfterMap.get(a)?.length ?? Number.MIN_SAFE_INTEGER;
                const afterB = pageToPagesAfterMap.get(b)?.length ?? Number.MIN_SAFE_INTEGER;
                return afterB - afterA;
            });

            sum += printQueue[Math.floor(printQueue.length / 2)];
        }
    }

    return sum.toString();
}
