
export default {

  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: true,
  clearMocks: true,
  testMatch: [
    // '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  setupFilesAfterEnv: ['./src/app/__tests__/databaseConnection.ts'],
  collectCoverageFrom: ['src/app/**/*.ts']
}
