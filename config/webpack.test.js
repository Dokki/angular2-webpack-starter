const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

const DEFAULT_METADATA = webpackMerge(commonConfig.metadata, {
    ENV,
    HMR: false,
});

const METADATA = require('yargs')
    .default(DEFAULT_METADATA)
    .argv;

const CONFIG = webpackMerge.smart(commonConfig, {
    metadata: METADATA,

    devtool: 'inline-source-map',

    resolve: {
        extensions: ['', '.ts', '.js'],
        root: helpers.root('src'),

    },

    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [helpers.root('node_modules')],
            },
        ],

        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                query: {
                    compilerOptions: {
                        removeComments: true,
                    },
                },
                exclude: [/\.e2e\.ts$/],
            },
        ],
    },
    plugins: [
        new DefinePlugin({
            ENV: JSON.stringify(ENV),
            HMR: false,
            'process.env': {
                ENV: JSON.stringify(ENV),
                NODE_ENV: JSON.stringify(ENV),
                HMR: false,
            },
        }),
    ],
    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src',
    },
    node: {
        global: 'window',
        process: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false,
    },
});

module.exports = CONFIG;
