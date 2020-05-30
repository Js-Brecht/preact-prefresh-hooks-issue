const path = require('path');

const resolve = (m) => require.resolve(m);

module.exports = function preset(_, options = {}) {
    return {
        presets: [
            [
                resolve('@babel/preset-env'),
                {
                    corejs: 3,
                    loose: true,
                    modules: false,
                    useBuiltIns: 'usage',
                    targets: ['>0.25%', 'not dead'],
                    // Exclude transforms that make all code slower (https://github.com/facebook/create-react-app/pull/5278)
                    exclude: ['transform-typeof-symbol'],
                },
            ],
            [
                resolve('@babel/preset-typescript'),
                {
                    jsxPragma: 'h',
                    allExtensions: false,
                },
            ],
            resolve('babel-preset-preact'),
        ],
        plugins: [
            require.resolve('react-refresh/babel'),
        ]
    }
}