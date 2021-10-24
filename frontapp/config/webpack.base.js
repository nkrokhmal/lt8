const { Config } = require('webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = new Config().merge({
  output: {
    path: path.resolve(__dirname, '../public/'),
    filename: 'assets/js/[name].min.js',
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../node_modules/bootstrap-css-only/css/bootstrap.min.css'),
      to: path.resolve(__dirname, '../public/assets/css/bootstrap.min.css')
    }, {
      from: path.resolve(__dirname, '../node_modules/bootstrap-css-only/css/bootstrap.min.css.map'),
      to: path.resolve(__dirname, '../public/assets/css/bootstrap.min.css.map')
    }, {
      from: path.resolve(__dirname, '../node_modules/bootstrap-css-only/css/bootstrap-grid.min.css'),
      to: path.resolve(__dirname, '../public/assets/css/bootstrap-grid.min.css')
    }, {
      from: path.resolve(__dirname, '../node_modules/bootstrap-css-only/css/bootstrap-grid.min.css.map'),
      to: path.resolve(__dirname, '../public/assets/css/bootstrap-grid.min.css.map')
    }, {
      from: path.resolve(__dirname, '../node_modules/antd/dist/antd.min.css'),
      to: path.resolve(__dirname, '../public/assets/css/antd.min.css')
    }, {
      from: path.resolve(__dirname, '../node_modules/rc-drawer/assets/index.css'),
      to: path.resolve(__dirname, '../public/assets/css/rc-drawer.css')
    }, {
      from: path.resolve(__dirname, '../src/resources/img'),
      to: path.resolve(__dirname, '../public/img')
    }, {
      from: path.resolve(__dirname, '../src/resources/fonts'),
      to: path.resolve(__dirname, '../public/assets/fonts')
    }]),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
      chunkFilename: 'assets/css/[id].css',
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['en', 'ru'],
    }),
    new webpack.DefinePlugin({
      'DEFAULTS': {
        HOST: JSON.stringify(process.env.HOST),
        HOST_PROTOCOL: JSON.stringify(process.env.HOST_PROTOCOL),
        API_ROOT: JSON.stringify(process.env.API_ROOT),
        LOG_LEVEL: JSON.stringify(process.env.LOG_LEVEL),
        LOG_TARGETS: JSON.stringify(process.env.LOG_TARGETS),
        LOCALE: JSON.stringify(process.env.LOCALE)
      }
    })
  ],
  stats: {
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    entrypoints: false,
    modules: false,
    reasons: false
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.css'],
    alias: {
      actions: path.resolve(__dirname, '../src/actions'),
      constants: path.resolve(__dirname, '../src/constants'),
      data: path.resolve(__dirname, '../src/data'),
      storage: path.resolve(__dirname, '../src/storage'),
      styles: path.resolve(__dirname, '../src/styles'),
      views: path.resolve(__dirname, '../src/views'),
      utilities: path.resolve(__dirname, '../src/utilities')
    }
  },
  module: {
    rules: [{
      test: /(\.js|\.jsx)$/,
      use: [{
        loader: 'babel-loader',
        options: {
          compact: false
        }
      }]
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'url-loader'
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'file-loader'
    }]
  },
  node: { fs: 'empty' },
  performance: { hints: false }
});
