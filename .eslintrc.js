// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    extends: 'airbnb-base',
    plugins: [
        'html',
    ],
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js',
            },
        },
    },
    'env': {
        browser: true,
        node: true,
    },
    'globals': {
        'window': true,
        'mapboxgl': true,
        'document': true,
        'isSupported': true,
        'MapboxGeocoder': true,
    },
    'rules': {
        'global-require': 0,

        'no-param-reassign': 0,

        'import/no-unresolved': 0,
        'import/imports-first': 0,

        'indent': 0,
        'func-names': 0,
        'max-len': 0,
        'no-new': 0,
        'no-shadow': 0,
        'space-before-function-paren': 0,
        'no-trailing-spaces': 0,
        'prefer-template': 0,
        'no-console': 0,
        'no-use-before-define': ['error', { 'functions': false }],
        'prefer-default-export': 0,

        'import/extensions': ['error', 'always', {
            'js': 'never',
            'vue': 'never',
        }],
        // deactivate debugger during production
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    },
};
