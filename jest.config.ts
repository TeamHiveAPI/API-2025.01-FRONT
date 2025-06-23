module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy" 
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: "<rootDir>/tsconfig.app.json"
    }]
  },
  testMatch: [
    "<rootDir>/tests/*.test.{ts,tsx}",
    "<rootDir>/tests/**/*.test.{ts,tsx}",
    "<rootDir>/src/tests/*.test.{ts,tsx}",
    "<rootDir>/src/tests/**/*.test.{ts,tsx}"
  ]
};
