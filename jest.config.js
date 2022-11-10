/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // testMatch: ['**/__tests__/**/*.test.ts'],
    // testMatch: ['**/plugin/__tests__/**/*.test.ts'],
    // testMatch: ['**/__tests__/**/tsx.test.ts'],
    testMatch: ['**/parse/__tests__/**/*.test.ts'],
};
