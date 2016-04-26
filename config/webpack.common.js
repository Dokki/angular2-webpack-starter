const webpack = require('webpack');
const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEFAULT_METADATA = {
    baseUrl: '/',
};

const METADATA = require('yargs')
    .default(DEFAULT_METADATA)
    .argv;

const CONFIG = {

    metadata: METADATA,

    entry: {
        polyfills: './src/polyfills.ts',
        vendor: './src/vendor.ts',
        main: './src/main.ts',
    },

    resolve: {
        extensions: ['', '.ts', '.js'],

        // Make sure root is src
        root: helpers.root('src'),

        // remove other default values
        modulesDirectories: ['node_modules'],

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
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/\.(spec|e2e)\.ts$/],
            },

            {
                test: /\.json$/,
                loader: 'json-loader',
            },

            {
                test: /\.css$/,
                loader: 'style!css?sourceMap',
            },
            {
                test: /\.less$/,
                loader: 'style!css?sourceMap!less?sourceMap',
            },

            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: [helpers.root('src/index.html')],
            },
        ],
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: helpers.packageSort(['polyfills', 'vendor', 'main']),
        }),

    ],

    // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/],
        ],
        customAttrAssign: [/\)?\]?=/],
    },

    node: {
        global: 'window',
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false,
    },
};

const FILE_LOADER_EXTS = [
    'jpg', 'png', 'jpeg', 'gif', 'svg',
    'woff', 'woff2', 'ttf', 'eot',
];

FILE_LOADER_EXTS.forEach(ext => {
    CONFIG.module.loaders.push({
        test: new RegExp(`\\.${ext}$`),
        loader: 'file',
    });
});

module.exports = CONFIG;
