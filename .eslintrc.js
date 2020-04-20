module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "comma-dangle": ["error", "never"],
    "no-param-reassign": ["error", { "props": false }],
    "linebreak-style": "off",
    "eol-last": "off",
    "camelcase": "off",
    "space-before-blocks": "off",
    "no-trailing-spaces": "off",
    "indent": "off",
    "no-param-reassign": "off",
    "no-return-assign": "off",
    "arrow-parens": "off",
    "no-shadow": "off",
    "keyword-spacing": "off",
    "no-use-before-define": "off",
    "semi": "off",
    "no-extra-semi": "off",
    "max-len": "off",
    "no-unused-vars": "off",
    "no-alert": "off",
    "no-multiple-empty-lines": "off",
    "no-spaced-func": "off",
    "func-call-spacing": "off",
    "no-console": "off",
    "arrow-body-style": "off",
    "operator-linebreak": "off",
    "quotes": "off",
    "comma-dangle": "off",
    "padded-blocks": "off"
  },
};