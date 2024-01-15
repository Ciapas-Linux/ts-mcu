const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: resolve(__dirname, 'src'),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader", 
          "css-loader"
        ],
      },
    ],
  },

  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      scriptLoading: 'blocking',
      template: 'public/index.html',
     }),
    new CopyPlugin({
      patterns: [
        //'./public/favicon.ico',
        './public/style.css',
      ]
    })
  ],

  resolve: {
    extensions: [/*'', */'.ts', '.js'],
  }
}
