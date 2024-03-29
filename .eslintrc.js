module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'prettier/prettier': 'error',
        '@typescript-eslint/no-var-requires': 1,
        '@typescript-eslint/ban-ts-comment': 1,
        // 'space-before-function-paren': ['error', 'never'],
    },
};
