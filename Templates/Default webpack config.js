/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Variables
const os = require('os'),
    path = require('path'),
    webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');


// Export module
module.exports = (env) => {
    const environment = env || {},
        parameters = {
            entry: {
                app: './src/app.ts',
                style: './styles/style.styl'
            },
            experiments: {
                outputModule: true
            },
            output: {
                path : path.resolve(__dirname, './dest'),
                filename: './javascripts/[name].js',
                library: {
                    type: "module"
                }
            },
            module: {
                rules: [{
                    test: /\.ts(x?)$/,
                    exclude: /(node_modules|dest)/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            comments: false,
                            plugins: ['@babel/plugin-transform-runtime'],
                            presets: [
                                ['@babel/preset-env', {
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                    targets: {
                                        // node: 'current',
                                        browsers: ['last 1 version']
                                    }
                                }]
                            ]
                        }
                    }, {
                        loader: 'ts-loader'
                    }]
                }, {
                    test: /\.styl$/,
                    exclude: /(node_modules|dest)/,
                    use: [{
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'stylus-loader'
                    }]
                }]
            },
            resolve: {
                modules: [
                    path.resolve(__dirname, './src'),
                    'node_modules'
                ],
                extensions: ['*', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
            },
            plugins: [
                new FixStyleOnlyEntriesPlugin(),
                new MiniCssExtractPlugin({filename: './styles/[name].css'})
            ],
            target: 'web',
            performance: {
                hints: 'warning',
                maxAssetSize: 256 * 1024
            },
            stats: 'normal' // 'detailed', 'verbose'
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

