/**
 * We use webpack only to build and locally run a sample app, with automatic refresh when source files change.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'demo/src/index.js'),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    // output: {
    //     path: path.resolve(__dirname, './sample'),
    //     filename: 'index.js'
    // },
    devtool: 'inline-source-map',
    devServer: {
        port: 3001  //,
        // contentBase: './dist'
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'demo/src/index.html'),
            filename: "./index.html"
        })
    ]
};
