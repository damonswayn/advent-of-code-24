import path from 'node:path';
import {TestInput} from '../lib/TestInput';
import { solve } from './03b';

describe('Day Three, Problem B', () => {
  const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
  const testInput = TestInput.fromFile(TEST_INPUT_FILE);

  it('test input is correct', () => {
    expect(testInput.lines().length).toBe(1);
  });

  it('solution is correct', () => {
    expect(solve(testInput)).toBe('48');
  });
});