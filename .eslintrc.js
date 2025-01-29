module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true,
    jquery: false,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@babel/eslint-parser',
  rules: {
    indent: ['off', 2],
    'import/no-extraneous-dependencies': [
      'off',
      { devDependencies: ['gulpfile.babel.js', 'gulp/**/*'] },
    ],
    'import/no-import-module-exports': [
      'off',
      { exceptions: ['gulpfile.babel.js', 'gulp/**/*'] },
    ],
    'import/resolver': [
      'off',
      { exceptions: ['gulpfile.babel.js', 'gulp/**/*'] },
    ],
    'implicit-arrow-linebreak': [
      'off',
      { exceptions: ['gulpfile.babel.js', 'gulp/**/*'] },
    ],
    'no-var': 'error',
    'object-curly-newline': 'off',
    'max-len': 'off',
    'no-multi-assign': 'off',
    'no-unused-vars': 'error',
    'no-undef': 'off',
    'no-console': 'error',
    quotes: [2, 'single'],
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-useless-return': 'off',
    'no-param-reassign': 'off',
    'no-new': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src/js']],
        extensions: ['.js'],
      },
    },
  },
}
