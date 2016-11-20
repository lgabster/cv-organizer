const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    cvapp: [
      './app/src/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, './app/dist'),
    publicPath: '/build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue',
      src: path.resolve(__dirname, './app/src'),
      style: path.resolve(__dirname, './app/style'),
      components: path.resolve(__dirname, './app/components')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ],
  devtool: '#eval-source-map'
}
