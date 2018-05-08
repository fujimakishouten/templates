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
                rules: [
                    /*{
                        test: /\.js$/,
                        enforce: 'pre',
                        use: {
                            loader: 'source-map-loader'
                        }
                    },
                    {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'awesome-typescript-loader'
                    }
                    },*/
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                comments: false,
                                plugins: ['@babel/plugin-transform-runtime'],
                                presets: [
                                    ["@babel/preset-env", {
                                        "useBuiltIns": "usage",
                                        "targets": {
                                            // "node": "current",
                                            "browsers": ["last 1 version"]
                                        }
                                    }]
                                ]
                            }
                        }
                    }
                ]
            },
            resolve: {
                modules: [
                    path.resolve(__dirname, './src'),
                    "node_modules"
                ],
                extensions: ["*", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
            },
            plugins: [
                new webpack.ProvidePlugin({jQuery: "jquery"})
            ],
            target: "web",
            performance: {
                hints: "warning",
                maxAssetSize: 256 * 1024
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
    } else {
        parameters.devtool = 'inline-source-map';
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

