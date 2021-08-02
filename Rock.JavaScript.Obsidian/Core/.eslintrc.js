module.exports = {
    root: false,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
        browser: true,
        amd: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    rules: {
        'no-undef': 'off',
        'no-tabs': 'warn',
        quotes: ['warn', 'double', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
        semi: ['warn', 'always'],
        '@typescript-eslint/no-inferrable-types': 'off'
    }
};
