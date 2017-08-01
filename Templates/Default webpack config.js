/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Variables
const os = require('os'),
    path = require('path'),
    webpack = require('webpack');


// Export module
module.exports = function (env) {
    const environment = env || {},
        parameters = {
            entry: {
                app: './src/app.js'
            },
            output: {
                path : path.resolve(__dirname, './dest'),
                filename: '[name].js'
            },
            module: {
                rules: [{
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            comments: false,
                            plugins: ['transform-runtime']
                        }
                    }
                }]
            },
            resolve: {
                modules: [
                    path.resolve(__dirname, './src'),
                    "node_modules"
                ]
            },
            plugins: [
                new webpack.ProvidePlugin({jQuery: "jquery"})
            ],
            target: "web",
            performance: {
                hints: "warning",
                maxAssetSize: 250 * 1024
            },
            stats: "normal" // "detailed", "verbose"
        };

    if (environment.production) {
        parameters.plugins.push(new webpack.optimize.UglifyJsPlugin({
            parallel: {
                cache: true,
                workers: os.cpus().length
            },
            uglifyOptions: {
                warnings: true,
                compress: true
            }
        }));
    }

    return parameters;
};




/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

