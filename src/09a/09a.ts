import { TestInput, TestInputLine } from '../lib/TestInput';

export class Disk {
    private readonly disk: (number | string)[];

    public static fromString(input: string): Disk {
        return new Disk(input.split(''));
    }

    constructor(disk: (number | string)[]) {
        this.disk = disk;
    }

    public defragment(): (number | string)[] {
        const copy = this.disk.slice();
        let left = 0,
            right = this.disk.length - 1;

        while (left < copy.length && copy[left] !== '.') left++;
        while (right > left) {
            while (right > left && copy[right] === '.') right--;
            if (right <= left) break;
            [copy[left], copy[right]] = [copy[right], '.'];
            while (left < copy.length && copy[left] !== '.') left++;
            right--;
        }

        return copy;
    }

    public defragmentToString(): string {
        return this.defragment().join('');
    }

    public calculateDefragedChecksum(): number {
        return this.defragment().reduce((checksum: number, block: string | number, index: number) => {
            return checksum + (String(block) === '.' ? 0 : index * Number(block));
        }, 0);
    }

    public getDisk(): string {
        return this.disk.join('');
    }
}

export class DiskMap {
    private readonly map: number[];

    public static fromInput(input: TestInput): DiskMap[] {
        const diskMaps: DiskMap[] = [];
        input.lines().forEach((line: TestInputLine) => {
            diskMaps.push(new DiskMap(line.splitPerCharacterNumbers()));
        });

        return diskMaps;
    }

    public static fromString(input: string): DiskMap {
        return new DiskMap(input.split('').map(Number));
    }

    constructor(map: number[]) {
        this.map = map;
    }

    public decompress(): Disk {
        const diskblocks: (string | number)[] = [];
        let isFile = true;
        let fileId = 0;
        for (const length of this.map) {
            diskblocks.push(...Array<string | number>(length).fill(isFile ? fileId.toString() : '.'));
            if (isFile) {
                fileId++;
            }
            isFile = !isFile;
        }

        return new Disk(diskblocks);
    }
}

export function solve(input: TestInput): string {
    const diskMaps = DiskMap.fromInput(input);
    const disks = diskMaps.map((diskMap) => diskMap.decompress());
    const checksums = disks.map((disk) => disk.calculateDefragedChecksum());
    return checksums.join('');
}
