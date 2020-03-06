require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

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
        host: '0.0.0.0',
        hot: false,
        inline: false,
        liveReload: false,
        port: process.env.PORT,
        // public: process.env.PUBLIC_URL,
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