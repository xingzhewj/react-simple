const webpack = require('webpack');
const path = require('path');
// 插件引用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'less-loader'
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
        }),
        new CleanWebpackPlugin(path.join(__dirname, '../dist'), {
            root: path.resolve(__dirname, '../'),
            verbose:  true
        })
    ],
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