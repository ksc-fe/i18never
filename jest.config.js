/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // testMatch: ['**/__tests__/**/*.test.ts'],
    testMatch: ['**/__tests__/**/inquire.test.ts'],
};
