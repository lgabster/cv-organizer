const path = require('path')

module.exports = {
  entry: {
    app: [
      './app/src/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, './app/dist'),
    publicPath: '/assets/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
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
      'vue$': 'vue/dist/vue'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: '#eval-source-map'
}
