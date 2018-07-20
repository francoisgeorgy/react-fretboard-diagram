const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.dev.js');

module.exports = merge(commonConfig, {
    entry: './src/sample-app/index.js',
    output: {
        path: path.resolve(__dirname, './sample'),
        filename: 'index.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/sample-app/index.html'})
    ]
});
