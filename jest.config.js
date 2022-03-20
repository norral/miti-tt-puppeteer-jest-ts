module.exports = {
  testTimeout: 20000,
  verbose: true,
  testMatch: ['**/?(*.)+(spec|test).[t]s'],
  preset: 'jest-puppeteer',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', 'dist']
};
