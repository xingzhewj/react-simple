/**
 * @file 生产环境webpak配置脚本
 * @Author wangjie19
 * @Date 2018-06-25 11:24:33
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-06-25 17:06:20
 */


const webpack = require('webpack');
const path = require('path');
// 插件引用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    mode: 'production',
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
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, '../node_modules'),
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, './postcss-prod-config.js')
                            }
                        }
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
            title: '框架模板',
            filename: path.join(__dirname, '../dist/index.html'),
            favicon: path.resolve(__dirname, '../src/images/favicon.ico')
        }),
        // 配置css抽离
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: 'style-[contenthash].css'
        }),
        // // 压缩css
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessorOptions: {
        //         safe: true,
        //         // 禁用此插件的autoprefixer功能，因为要使通过postcss来使用autoprefixer
        //         autoprefixer: false,
        //         discardComments: {
        //             removeAll: true
        //         }
        //     },
        //     canPrint: true
        // }),
        new CleanWebpackPlugin(path.join(__dirname, '../dist'), {
            root: path.resolve(__dirname, '../'),
            verbose:  true
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
    }
};