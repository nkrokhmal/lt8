const {Config} = require('webpack-config');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');


module.exports = new Config()
  .extend(path.resolve(__dirname, 'webpack.base.js'))
  .merge({
    devtool: 'inline-cheap-module-source-map',
    mode: 'production',
    entry: {app: [
      '@babel/polyfill',
      '@babel/register',
      './src/index.jsx'
    ]},
    externals: [nodeExternals()],
    target: 'node',
    optimization: {
      occurrenceOrder: true,
      mergeDuplicateChunks: true
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env':
          {NODE_ENV: JSON.stringify('production')}
      })
    ],
    module: {
      rules: [{
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        query: {
          compact: false,
          plugins: ['babel-plugin-istanbul']
        }
      }, {
        test: /(\.js|\.jsx)$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'istanbul-instrumenter-loader',
        query: {esModules: true}
      }]
    }
  });
