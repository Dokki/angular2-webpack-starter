const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const DefinePlugin = require('webpack/lib/DefinePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const DEFAULT_METADATA = webpackMerge(commonConfig.metadata, {
    ENV,
    HMR: false,
});

const METADATA = require('yargs')
    .default(DEFAULT_METADATA)
    .argv;

const CONFIG = webpackMerge.smart(commonConfig, {
    metadata: METADATA,

    debug: false,
    devtool: 'source-map',
    output: {
        path: helpers.root('dist'),
        filename: '[name].[hash].bundle.js',
    },

    module: {
        preloaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [helpers.root('node_modules')],
            },
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss'),
            },

            // {
            //     test: /\.png$/,
            //     loader: 'url?limit=10000000',
            // },
        ],
    },

    plugins: [
        new CommonsChunkPlugin({
            name: helpers.reverse(['polyfills', 'vendor']),
        }),

        new WebpackMd5Hash(),
        new DedupePlugin(),

        new DefinePlugin({
            ENV: JSON.stringify(METADATA.ENV),
            HMR: METADATA.HMR,
            'process.env': {
                ENV: JSON.stringify(METADATA.ENV),
                NODE_ENV: JSON.stringify(METADATA.ENV),
                HMR: METADATA.HMR,
            },
        }),

        // jscs: disable
        new UglifyJsPlugin({
            // beautify: true, //debug
            // mangle: false, //debug
            // dead_code: false, //debug
            // unused: false, //debug
            // deadCode: false, //debug
            // compress: {
            //   screw_ie8: true,
            //   keep_fnames: true,
            //   drop_debugger: false,
            //   dead_code: false,
            //   unused: false
            // }, // debug
            // comments: true, //debug

            beautify: false, // prod

            mangle: {
                screw_ie8: true,
                keep_fnames: true,
            }, // prod

            compress: {
                screw_ie8: true,
            }, // prod

            comments: false, // prod
        }),
        // jscs: enable

        new ExtractTextPlugin('[name].[chunkhash].bundle.css'),
    ],

    postcss: [
        autoprefixer({
            browsers: ['last 4 version'],
        }),
    ],

    tslint: {
        emitErrors: true,
        failOnHint: true,
        resourcePath: 'src',
    },

    node: {
        global: 'window',
        crypto: 'empty',
        process: false,
        module: false,
        clearImmediate: false,
        setImmediate: false,
    },
});

module.exports = CONFIG;
