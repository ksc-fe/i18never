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
    testMatch: ['**/parse/__tests__/**/parse.test.ts'],
    // testMatch: ['**/parse/__tests__/**/transform.test.ts'],
    // testMatch: ['**/transform/__tests__/**/*.test.ts'],
};
