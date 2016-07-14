const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;


const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');

const DEFAULT_METADATA = webpackMerge(commonConfig.metadata, {
    host: 'localhost',
    port: 3000,
    ENV,
    HMR,
});

const METADATA = require('yargs')
    .default(DEFAULT_METADATA)
    .argv;

const CONFIG = webpackMerge.smart(commonConfig, {
    metadata: METADATA,

    // debug: true,
    devtool: '#cheap-module-eval-source-map',
    // devtool: '#source-map',
    output: {
        path: helpers.root('dist'),
        filename: '[name].bundle.js',
        publicPath: `http://${METADATA.host}:${METADATA.port}/`,
    },
    plugins: [
        new ForkCheckerPlugin(),
        new DefinePlugin({
            ENV: JSON.stringify(METADATA.ENV),
            HMR: METADATA.HMR,
            'process.env': {
                ENV: JSON.stringify(METADATA.ENV),
                NODE_ENV: JSON.stringify(METADATA.ENV),
                HMR: METADATA.HMR,
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
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false,
    },
});

module.exports = CONFIG;
