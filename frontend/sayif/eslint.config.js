import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 12,
                sourceType: 'module',
            },
        },
        plugins: {
            react: pluginReact,
            prettier: pluginPrettier,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            indent: ['error', 4],
            'linebreak-style': ['error', 'windows'],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'no-unused-vars': 'warn',
            'no-extra-semi': 'error',
            'no-tabs': ['error', { allowIndentationTabs: true }],
            'prettier/prettier': 'error',
        },
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
];
