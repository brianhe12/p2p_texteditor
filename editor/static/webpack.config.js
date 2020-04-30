const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  devtool: 'source-map',
  entry: {
    quill: './quill.js'
  },
  plugins: [
        new ManifestPlugin({
            fileName: 'manifest.json',
            stripSrc: true,
            publicPath: 'static/dist/'
        })
    ],
  output: {
    globalObject: 'self',
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].[contenthash].js',
    publicPath: 'static/dist/'
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    publicPath: '/static/dist/'
  }
}
