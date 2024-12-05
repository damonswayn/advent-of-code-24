/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
    reporters: [
        "default",
        ["jest-junit", {outputDirectory: "reports", outputName: "report.xml"}],
    ],
    "testPathIgnorePatterns": [
        ".template"
    ]
};