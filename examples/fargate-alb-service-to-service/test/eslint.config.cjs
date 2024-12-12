const globals = require('globals');

module.exports = [{
  languageOptions: {
    globals: globals.node,
    ecmaVersion: 2017,
    sourceType: 'commonjs',
  },
  
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
}];