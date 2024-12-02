import {TestInput, TestInputLine} from '../lib/TestInput';

export function solve(input: TestInput): string {
  const lists = generateLists(input);
  const listA = lists[0];
  const listB = lists[1];

  if (listA.length !== listB.length) {
    throw new Error('Lists must be the same length');
  }

  const sortedA = sortCopy(listA);
  const sortedB = sortCopy(listB);
  return calculateDistanceList(sortedA, sortedB)
    .reduce((acc, val) => acc + val, 0)
    .toString();
}

export function generateLists(input: TestInput): [number[], number[]] {
  return input.reduce((acc: [number[], number[]], line: TestInputLine): [number[], number[]] => {
    const split = line.splitNumbersWhitespace();
    acc[0].push(split[0]);
    acc[1].push(split[1]);
    return acc;
  }, [[], []]);
}

function calculateDistanceList(sortedA: number[], sortedB: number[]): number[] {
  const distList = [];

  for (let i = 0; i < sortedA.length; i++) {
    const a = sortedA[i];
    const b = sortedB[i];
    distList.push(Math.abs(a - b));
  }

  return distList;
}

function sortCopy<T>(arr: T[]): T[] {
  return [...arr].sort();
}