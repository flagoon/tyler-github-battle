const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
    new Dotenv(),
  ],
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
}
