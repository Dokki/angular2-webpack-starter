/* global process */

const helpers = require('./helpers');

// const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const autoprefixer = require('autoprefixer');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');

const metadata = {
    baseUrl: '/',
    host: 'localhost',
    port: 3000,
    ENV,
    HMR,
};

/*
 * Config
 * with default values at webpack.default.conf
 */
module.exports = {
    // static data for index.html
    metadata,

    devtool: 'source-map',  // 'source-map',
    debug: true,

    // our angular app
    entry: {
        polyfills: './src/polyfills.ts',
        main: './src/main.ts',
    },

    resolve: {
        extensions: ['', '.ts', '.js'],
    },

    // Config for our build files
    output: {
        path: helpers.root('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        publicPath: 'http://localhost:3000/',
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [helpers.root('node_modules/rxjs')],
            },
        ],

        loaders: [

            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/\.(spec|e2e)\.ts$/, helpers.root('node_modules')],
            },

            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [helpers.root('node_modules')],
            },

            // Support for CSS
            {
                test: /\.css$/,
                loader: 'style!css?sourceMap',
            },
            {
                test: /\.less$/,
                loader: 'style!css?sourceMap!less?sourceMap',
            },

            // Support for .html
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: [helpers.root('src/index.html'), helpers.root('node_modules')],
            },

            // Support for static files (images, fonts, etc)
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file',
            },

        ],
    },

    plugins: [
        new ForkCheckerPlugin(),
        new OccurenceOrderPlugin(true),
        new CommonsChunkPlugin({
            name: 'polyfills',
            filename: 'polyfills.bundle.js',
            minChunks: Infinity,
        }),

        // generating html
        new HtmlWebpackPlugin({ template: 'src/index.html' }),

        // replace
        new DefinePlugin({
            'process.env': {
                ENV: JSON.stringify(metadata.ENV),
                NODE_ENV: JSON.stringify(metadata.ENV),
                HMR,
            },
        }),
    ],

    // Other module loader config
    postcss: [
        autoprefixer({
            browsers: ['last 2 version'],
        }),
    ],

    // our Webpack Development Server config
    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src',
    },

    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
    },

    node: {
        global: 'window',
        progress: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false,
    },
};
