export default {
  testEnvironment: 'node',
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
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
