module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
    },
    extends: 'airbnb-base',
    plugins: [
        'html',
        'import',
    ],
    rules: {
        'global-require': 0,
        'indent': 0,
        'max-len': 0,
        'space-before-function-paren': 0,
        'function-paren-newline': 0,
        'no-trailing-spaces': 0,
        'no-param-reassign': 0,
        'prefer-template': 0,
        'no-console': 0,
        'no-use-before-define': ['error', { 'functions': false }],
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': 0,
        'import/extensions': 0,
    },
    'globals': {
        'mapboxgl': false,
        'MapboxGeocoder': false,
    },
};
