import { TestInput, TestInputLine } from '../lib/TestInput';

export class Disk {
    private readonly disk: (number | string)[];

    constructor(disk: (number | string)[]) {
        this.disk = disk;
    }

    public defragment(): (number | string)[] {
        const copy = this.disk.slice();
        const files: { id: number; size: number; positions: number[] }[] = [];
        const freeSpans: { start: number; end: number; size: number }[] = [];

        copy.forEach((block: number | string, index: number) => {
            if (block !== '.') {
                const blockNum = Number(block);
                files[blockNum] ??= { id: blockNum, size: 0, positions: [] };
                files[blockNum].positions.push(index);
                files[blockNum].size++;
            } else if (!freeSpans.length || freeSpans.at(-1)!.end + 1 !== index) {
                freeSpans.push({ start: index, end: index, size: 1 });
            } else {
                freeSpans.at(-1)!.end++;
                freeSpans.at(-1)!.size++;
            }
        });

        files.reverse().forEach((file) => {
            const { size, positions } = file;
            const fileStartPos = positions[0];
            const targetSpan = freeSpans.find((span) => span.size >= size && span.end < fileStartPos);

            if (targetSpan) {
                positions.forEach((pos) => (copy[pos] = '.'));
                for (let i = 0; i < size; i++) {
                    copy[targetSpan.start + i] = file.id;
                }

                if (targetSpan.size === size) {
                    freeSpans.splice(freeSpans.indexOf(targetSpan), 1);
                } else {
                    targetSpan.start += size;
                    targetSpan.size -= size;
                }

                freeSpans.push({ start: fileStartPos, end: fileStartPos + size - 1, size });
            }
        });

        return copy;
    }

    public calculateDefragedChecksum(): number {
        return this.defragment().reduce((checksum: number, block: string | number, index: number) => {
            return checksum + (String(block) === '.' ? 0 : index * Number(block));
        }, 0);
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
    const disk = diskMaps[0].decompress();
    return disk.calculateDefragedChecksum().toString();
}
