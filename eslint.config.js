import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    ...vue.configs['flat/recommended'],
    {
        files: ['**/*.js', '**/*.vue'],
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': 'error',
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
            'vue/html-indent': ['error', 4],
            'vue/script-indent': ['error', 4],
            'vue/max-attributes-per-line': 'off',
            'vue/first-attribute-linebreak': 'off',
            'vue/html-closing-bracket-newline': 'off',
        },
    },
    {
        ignores: [
            'node_modules/',
            'docs/.vitepress/dist/',
            'docs/.vitepress/cache/',
            '.vscode/',
        ],
    },
];
