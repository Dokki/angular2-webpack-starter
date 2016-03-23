// @AngularClass

const helpers = require('./helpers');

// Webpack Plugins
// const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
* Config
*/
module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['', '.ts', '.js'],
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [
                    helpers.root('node_modules'),
                ],
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    helpers.root('node_modules/rxjs'),
                ],
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
                exclude: [/\.e2e\.ts$/, helpers.root('node_modules')],
            },

            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [helpers.root('src/index.html'), helpers.root('node_modules')],
            },

            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: [helpers.root('src/index.html'), helpers.root('node_modules')],
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
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file',
            },
        ],
        postLoaders: [

            // instrument only testing sources with Istanbul
            {
                test: /\.(js|ts)$/,
                include: helpers.root('src'),
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/,
                ],
            },
        ],
    },
    plugins: [
        new DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV),
                NODE_ENV: JSON.stringify(ENV),
            },
        }),
    ],
    node: {
        global: 'window',
        progress: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false,
    },
    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src',
    },
};
