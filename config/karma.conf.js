module.exports = function (config) {
    var testWebpackConfig = require('./webpack.test.js');

    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        // list of files to exclude
        exclude: [],

        files: [{ pattern: './config/spec-bundle.js', watched: false }],

        preprocessors: { './config/spec-bundle.js': ['webpack'] },

        // Webpack Config at ./webpack.test.js
        webpack: testWebpackConfig,

        webpackServer: { noInfo: true },

        reporters: ['mocha'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: [
            'PhantomJS',
        ],

        singleRun: true,
    });
};
