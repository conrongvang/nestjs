const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: ['prettier'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'import/named': OFF,
    '@typescript-eslint/interface-name-prefix': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-empty-function': WARN,
    'no-restricted-globals': OFF,
    'no-plusplus': OFF,
    'no-continue': OFF,
    'no-console': OFF,
    complexity: WARN,
    'no-await-in-loop': OFF,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'class-methods-use-this': OFF,
    'import/prefer-default-export': OFF,
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'jest/expect-expect': OFF,
    'no-useless-constructor': OFF,
    'prettier/prettier': ['error'],
  },
};
