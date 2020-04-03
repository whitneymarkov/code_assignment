const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            src: path.join(__dirname, 'src'),
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
    },
    entry: path.resolve('src', 'index.tsx'),
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                loader: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }, { loader: 'eslint-loader' }],
            },

            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: ['file-loader'],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('index.html'),
        }),
    ],
};
