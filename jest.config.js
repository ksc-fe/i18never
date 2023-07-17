/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testTimeout: 60000,
    testEnvironment: 'node',
    // testMatch: ['**/__tests__/**/*.test.ts'],
    // testMatch: ['**/plugin/__tests__/**/*.test.ts'],
    // testMatch: ['**/plugin-webpack/__tests__/**/*.test.ts'],
    // testMatch: ['**/client/__tests__/**/*.test.ts'],
    // testMatch: ['**/__tests__/**/tsx.test.ts'],
    // testMatch: ['**/parser/__tests__/visitors/*.test.ts'],
    // testMatch: ['**/preprocess/__tests__/index.test.ts'],
    // testMatch: ['**/preprocess/__tests__/(index).test.ts'],
    testMatch: ['**/preprocess/__tests__/parsers/*.test.ts'],
    // testMatch: ['**/(transform|shared)/__tests__/*.test.ts'],
    // testMatch: ['**/parser/__tests__/visitors/stringLiteral.test.ts'],
    // testMatch: ['**/parse/__tests__/**/transform.test.ts'],
    // testMatch: ['**/transform/__tests__/**/*.test.ts'],
    moduleNameMapper: {
        '@i18never/(.*)$': `<rootDir>/packages/$1/src`,
    },
};
