const CompressionPlugin = require('compression-webpack-plugin');
const {Config} = require('webpack-config');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const chunkGroups = require('./chunkGroups');
const path = require('path');
const webpack = require('webpack');


module.exports = new Config()
  .extend(path.resolve(__dirname, 'webpack.base.js'))
  .merge({
    devtool: 'source',
    mode: 'production',
    entry: {
      app: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        '@babel/register',
        './src/index.jsx'
      ]
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      minimize: true,
      occurrenceOrder: true,
      mergeDuplicateChunks: true,
      splitChunks: {
        chunks: 'all',
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: chunkGroups
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
          }          
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: __dirname,
          postcss: [autoprefixer(
            {overrideBrowserslist: ['last 5 versions']}
          )]
        }
      }),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        title: 'apprtc',
        filename: 'index.html',
        template: 'page-templates/general.hbs',
        env: '"production"',
        hash: true,
        inject: false
      }),
      new HtmlWebpackHarddiskPlugin(),
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 0,
        minRatio: 0.8
      })
    ],
    module: {
      rules: [{
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: false
          }
        }, {
          loader: 'css-loader',
          options: {
            url: true,
            modules: {
              // localIdentName: '[local]___[hash:base64:5]',
              localIdentName: '[local]'
            }
          }
        }, {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }]
      }, {
        test: /(\.sass|\.scss|\.css)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: false
          }
        }, {
          loader: 'css-loader',
          options: {
            url: true,
            modules: {
              // localIdentName: '[local]___[hash:base64:5]'
              localIdentName: '[local]'
            }
          }
        }, {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              fiber: false,
              modules: true,
              hashPrefix: `web${Date.now()}`,
              includePaths: [path.resolve(__dirname, '../src/styles')]
            }
          }
        }]
      }]
    }
  });
