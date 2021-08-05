module.exports = {
    root: true,
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
        'no-tabs': 'warn',
        quotes: ['warn', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
        semi: ['warn', 'always'],
        '@typescript-eslint/no-unused-vars': ["warn", {
            "argsIgnorePattern": "^_"
        }],
        '@typescript-eslint/no-inferrable-types': 'off'
    }
};
