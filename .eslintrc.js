// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],

  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  'env': {
    browser: true,
    node: true
  },
  'globals': {
    "window": true,
    "mapboxgl": true,
    "document": true,
    "isSupported": true,
    "MapboxGeocoder": true
  },
  // add your custom rules here
  'rules': {
    'global-require': 0,

    'no-param-reassign': 0,

    'import/no-unresolved': 0,
    'import/imports-first': 0,

    'indent': 0,
    'func-names': 0,
    'max-len': 0,
    'no-new': 0,
    'space-before-function-paren': 0,
    'no-trailing-spaces': 0,
    'prefer-template': 0,
    'no-console': 0,

    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
