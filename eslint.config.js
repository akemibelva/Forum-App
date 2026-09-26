import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import dicodingStyle from 'eslint-config-dicodingacademy';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.mocha,     // Menyediakan describe, it, beforeEach, dll.
        cy: 'readonly',       // Menyediakan cy & Cypress
        Cypress: 'readonly',
        expect: 'readonly',   // Menambahkan expect agar error expect is not defined hilang
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...(dicodingStyle.rules || {}),
      'react/prop-types': 'off',
      'no-alert': 'off',
      // Mengabaikan variabel tak terpakai yang diawali karakter underscore (_) atau bernama React/on/config
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^(React|on|config)$',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];