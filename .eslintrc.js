module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12
  },
  plugins: [
    'react', 'react-hooks', 'jest'
  ],
  rules: {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "no-console": 0,
    "quotes": ["error", "single"],
    "semi": ["error", "never"]
  }
}
