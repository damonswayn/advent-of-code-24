# Advent of Code 2024

Solving the Advent of Code 2024 puzzles in Typescript.

## Running

Tests are written using Jest. To run the tests, use the following command:

```bash
npm test
```

To generate solutions for the puzzles, use the following command:

```bash
npm run solutions
```

This will run each `solve.ts` file for each folder in the `src`
directory matching the pattern `[012][0-9][abAB]?`.

## Linting and formatting

This project uses ESLint and Prettier to enforce code style. To run the linter,
use the following command:

```bash
npm run lint
```

To automatically fix linting issues, use the following command:

```bash
npm run lint:fix
```

For formatting, use the following command:

```bash
npm run format
```

## Auto-generating solution directory

There is a shell script that can be used to generate the correct directories
for each day. To use it, run the following command:

```bash
./scripts/generate-day.sh <day>
```

Where `<day>` is the day number you want to generate, e.g. `01`, `02`, `03`, etc.

You can also use the following npm script:

```bash
npm run generate -- <day>
```

Optionally, you can omit the day number to generate the next day:

```bash
npm run generate
```

This will generate the next day directory, e.g. if the last day generated was `03`,
it will generate `04`.

The template for the day directory is located in `.template`.

## Problems

| Day | Solved | Submitted |
|-----|--------|-----------|
| 01a | ✅      | ✅         |
| 01b | ✅      | ✅         |
| 02a | ✅      | ✅         |
| 02b | ✅      | ✅         |
| 03a | ✅      | ✅         |
| 03b | ✅      | ✅         |
| 04a | ✅      | ✅         |
| 04b | ✅      | ✅         |
| 05a | ✅      | ✅         |
| 05b | ✅      | ✅         |
| 06a | ✅      | ✅         |
| 06b | ✅      | ✅         |
| 07a | ✅      | ✅         |
| 07b | ✅      | ✅         |
| 08a | ✅      | ✅         |
| 08b | ✅      | ✅         |
| 09a | ✅      | ✅         |
| 09b | ✅      | ✅         |
| 10a | ✅      | ✅         |
| 10b | ✅      | ✅         |
| 11  |        |           |
| 12  |        |           |
| 13  |        |           |
| 14  |        |           |
| 15  |        |           |
| 16  |        |           |
| 17  |        |           |
| 18  |        |           |
| 19  |        |           |
| 20  |        |           |
| 21  |        |           |
| 22  |        |           |
| 23  |        |           |
| 24  |        |           |
| 25  |        |           |
