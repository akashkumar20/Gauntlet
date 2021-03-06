require('dotenv').config();
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const https = (process.env.HTTPS === 'true')
    ? {
        http2: true,
        https: {
            key: fs.readFileSync(path.join(__dirname, '.ssl/server.key')),
            cert: fs.readFileSync(path.join(__dirname, '.ssl/server.crt')),
            ca: fs.readFileSync(path.join(__dirname, '.ssl/rootCA.pem')),
        },
    }
    : {};
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer'),
                                require('postcss-nested'),
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test:  /\.(png|jpe?g|gif)$/i,
                use: [
                    'file-loader',
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        disableHostCheck: true,
        historyApiFallback: {
            index: 'index.html'
        },
        publicPath: 'https://gauntlet.askey.in/',
        host: '0.0.0.0',
        hot: false,
        inline: false,
        liveReload: false,
        port: 3003,
        public: process.env.ASKEY_WEB_URL,
        ...https,
    },
    plugins: [
        new Dotenv(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 100,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin()
    ],
    watch: true,
    watchOptions: {
        ignored: ['build', 'node_modules'],
    },
};