/**
 * @file 开发环境webpack配置脚本
 * @Author wangjie19
 * @Date 2018-06-25 11:24:59
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-06-25 17:53:05
 */


const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
// 插件引用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    // 入口文件配置
    entry: {
        main: path.join(__dirname, '../src/index.js')
    },
    // 出口文件配置
    output: {
        filename: '[name]-[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css', '.json'],
        alias: {
            Components: path.resolve(__dirname, '../src/components')
        }
    },
    // 模块处理配置
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                include: path.resolve(__dirname, '../src'),
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            useEslintrc: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }

                ]
            }
        ]
    },
    // 插件配置
    plugins: [
        // 配置页面html模板
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../index.html'),
            title: 'walker',
            filename: path.join(__dirname, '../dist/index.html'),
            favicon: path.resolve(__dirname, '../src/images/favicon.ico')
        }),
        // 配置css抽离
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                },
                styles: {
                    name: 'styles',
                    test: /\.(scss|css)$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    // 本地服务器配置
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, '../dist'),
        port: 8081,
        host: '0.0.0.0',
        publicPath: '/',
        // 开启gzip压缩
        compress: true,
        open: true,
        allowedHosts: [
            'test.baidu.com'
        ],
        historyApiFallback: true
    }
};