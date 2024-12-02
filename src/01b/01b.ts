import { generateLists } from '../01a/01a';
import { TestInput } from '../lib/TestInput';

export function solve(input: TestInput): string {
  const lists = generateLists(input);
  const listA = lists[0];
  const listB = lists[1];

  if (listA.length !== listB.length) {
    throw new Error('Lists must be the same length');
  }

  return calculateOccurencesList(listA, listB)
    .reduce((acc, val) => acc + val, 0)
    .toString();
}

function findOccurences(arr: number[], val: number): number {
  return arr.filter((v) => v === val).length;
}

function calculateOccurencesList(listA: number[], listB: number[]) {
  const occurencesList = [];

  for (const a of listA) {
    const occurencesInB = findOccurences(listB, a);
    occurencesList.push(a * occurencesInB);
  }

  return occurencesList;
}
