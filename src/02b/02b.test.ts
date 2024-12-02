import path from 'node:path';
import {TestInput} from '../lib/TestInput';
import { solve } from './02b';

describe('Day Two, Problem A', () => {
  const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
  const testInput = TestInput.fromFile(TEST_INPUT_FILE);

  it('test input is correct', () => {
    expect(testInput.lines().length).toBe(6);
  });

  it('solution is correct', () => {
    expect(solve(testInput)).toBe('4');
  });
});