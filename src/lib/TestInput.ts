import fs from 'node:fs';

export class TestInput {
    private content: string;

    public static fromFile(fileName: string, encoding: BufferEncoding = 'utf8'): TestInput {
        const data = fs.readFileSync(fileName, encoding);
        return new TestInput(data);
    }

    public static fromString(content: string): TestInput {
        return new TestInput(content);
    }

    constructor(content: string) {
        this.content = content;
    }

    public map<T>(fn: (line: TestInputLine) => T): T[] {
        return this.lines().map(fn);
    }

    public reduce<T>(fn: (acc: T, line: TestInputLine) => T, initialValue: T): T {
        return this.lines().reduce(fn, initialValue);
    }

    public filter(fn: (line: TestInputLine) => boolean): TestInput {
        return new TestInput(
            this.lines()
                .filter(fn)
                .map((line) => line.getContent())
                .join('\n'),
        );
    }

    public forEach(fn: (line: TestInputLine) => void): void {
        this.lines().forEach(fn);
    }

    public rawLines(): string[] {
        return this.content.split('\n');
    }

    public lines(): TestInputLine[] {
        return this.rawLines().map((line) => new TestInputLine(line));
    }

    public getContent(): string {
        return this.content;
    }

    public asMultiDimensionalArray(): string[][] {
        return this.rawLines().map((line) => line.split(''));
    }

    public asNewlineSeperatedChunks(): TestInput[] {
        return this.content.split('\n\n').map((chunk) => new TestInput(chunk));
    }
}

export class TestInputLine {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    public split(separator: string | RegExp, limit?: number): string[] {
        return this.content.split(separator, limit);
    }

    public splitWhitespace(): string[] {
        return this.split(/\s+/);
    }

    public splitNumbers(separator: string | RegExp = ' '): number[] {
        return this.split(separator).map(Number);
    }

    public splitNumbersWhitespace(): number[] {
        return this.splitNumbers(/\s+/);
    }

    public getContent(): string {
        return this.content;
    }
}
