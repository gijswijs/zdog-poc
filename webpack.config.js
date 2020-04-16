const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Zdog poc",
      template: './src/index.html'
    }),
  ],
  devServer: {
    contentBase: './docs',
    open: true
  },
  module: {
    rules: [
      { 
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'] 
      }
    ]
  }
};