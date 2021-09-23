module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  roots: ['./', '../'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
};
