module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/test/**/*.spec.(ts|js)"],
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src", "test"],
  setupFiles: ['<rootDir>/test/jestConfig.js']
};
