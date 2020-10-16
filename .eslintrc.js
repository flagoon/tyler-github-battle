module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'airbnb',
    'eslint-config-prettier',
    'prettier/react'
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 'off',
    "react/static-property-placement": 'off',
    "react/state-in-constructor": ['warn', 'never']
  },
}
