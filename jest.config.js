/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testTimeout: 60000,
    testEnvironment: 'node',
    testMatch: [
        // '**/(preprocess|shared|transform/client|cli)/__tests__/**/*.test.ts',
        // '**/vite/__tests__/index.test.ts',
        // '**/preprocess/__tests__/parsers/vue.test.ts',
        // '**/transform/__tests__/index.test.ts',
        '**/__tests__/**/*.test.ts',
    ],
    moduleNameMapper: {
        '@i18never/(.*)$': `<rootDir>/packages/$1/src`,
    },
};
