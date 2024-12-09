import { TestInput } from '../lib/TestInput';
import path from 'node:path';
import { Disk, DiskMap, solve } from './09a';

describe('Day Nine, Problem A', () => {
    const TEST_INPUT_FILE = path.resolve(__dirname, 'test.txt');
    const testInput = TestInput.fromFile(TEST_INPUT_FILE);

    test('test input is correct', () => {
        expect(testInput.lines().length).toBe(1);
    });

    test('DiskMap decompress generates correct output', () => {
        const diskMap = DiskMap.fromString('12345');
        expect(diskMap.decompress().getDisk()).toBe('0..111....22222');
    });

    test('DiskMap decompress generates correct output with 0 spaces between files', () => {
        const diskMap = DiskMap.fromString('90909');
        expect(diskMap.decompress().getDisk()).toBe('000000000111111111222222222');
    });

    test('DiskMap decompress generates the correct output for test input', () => {
        const diskMap = DiskMap.fromString('2333133121414131402');
        expect(diskMap.decompress().getDisk()).toBe('00...111...2...333.44.5555.6666.777.888899');
    });

    test('Disk defragment generates the correct output for test input', () => {
        const disk = Disk.fromString('0..111....22222');
        expect(disk.defragmentToString()).toBe('022111222......');
    });

    test('Disk defragment generates the correct output for test input for test input', () => {
        const disk = Disk.fromString('00...111...2...333.44.5555.6666.777.888899');
        expect(disk.defragmentToString()).toBe('0099811188827773336446555566..............');
    });

    test('Calculate the checksum for the test input', () => {
        const disk = Disk.fromString('00...111...2...333.44.5555.6666.777.888899');
        expect(disk.calculateDefragedChecksum()).toBe(1928);
    });

    test('solution is correct', () => {
        expect(solve(testInput)).toBe('1928');
    });
});
