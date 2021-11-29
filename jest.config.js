/** @type {jest.ProjectConfig} */
module.exports = {
  rootDir: __dirname,
  setupFiles: ['<rootDir>/test/setup.ts'],
  testRegex: 'packages/.*\\.(test|spec)\\.(ts|tsx)$',
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'js',
    'json',
  ],
  transformIgnorePatterns: [
    '/dist/',
    '/lib/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
  ],
  collectCoverageFrom: [
    '**/src/*.ts',
    '**/src/**/*.ts',
    '**/src/*.tsx',
    '**/src/**/*.tsx',
    '!**/__mocks__/**/*',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/fixture/'
  ],
  coverageDirectory: '<rootDir>/coverage',
};
