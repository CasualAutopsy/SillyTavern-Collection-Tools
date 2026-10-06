import { defineConfig } from 'jest';

export default defineConfig({
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    moduleFileExtensions: ['js'],
    testMatch: ['<rootDir>/tests/**/*.test.js'],
    passWithNoTests: true,
    collectCoverageFrom: [
        'src/core/**/*.js',
        '!src/core/**/index.js',
        '!src/core/**/*-cmds.js',
        '!src/core/**/*-macros.js',
    ],
    coverageProvider: 'babel',
    coverageThreshold: {
        global: {
            branches: 85,
            functions: 85,
            lines: 85,
            statements: 85,
        },
    },
    coverageReporters: ['text'],
});
