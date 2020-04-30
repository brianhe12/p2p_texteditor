const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    quill: './quill.js'
  },
  plugins: [
        new ManifestPlugin({
            fileName: 'manifest.json',
            stripSrc: true,
            publicPath: '/dist/'
        })
    ],
  output: {
    globalObject: 'self',
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].bundle.js',
    publicPath: '/dist/'
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    publicPath: '/dist/'
  }
}
