const { Config } = require('webpack-config');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chunkGroups = require('./chunkGroups');
const path = require('path');
const webpack = require('webpack');


module.exports = new Config()
	.extend(path.resolve(__dirname, 'webpack.base.js'))
	.merge({
		devtool: 'cheap-module-source-map',
		mode: 'development',
		entry: {
			app: [
				'core-js/stable',
				'regenerator-runtime/runtime',
				'@babel/register',
				'webpack-hot-middleware/client',
				'./src/index.jsx'
			]
		},
		resolve: {
			alias: {
				'react-dom': '@hot-loader/react-dom'
			}
		},
		optimization: {
			minimize: false,
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
			new HtmlWebpackPlugin({
				alwaysWriteToDisk: true,
				title: 'app rtc',
				filename: 'index.html',
				template: 'page-templates/general.hbs',
				env: '"development"',
				hash: true,
				inject: false
			}),
			new HtmlWebpackHarddiskPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('dev')
				}
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		],
		module: {
			rules: [{
				test: /\.less$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: true,
						reloadAll: true
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
						hmr: true,
						reloadAll: true
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
					loader: 'sass-loader',
					options: {
						implementation: require('sass'),
						sassOptions: {
							fiber: false,
							modules: true,
							hashPrefix: `web${Date.now()}`,
							includePaths: [path.resolve(__dirname, '../src/styles'), path.resolve(__dirname, '../node_modules')]
						}
					}
				}]
			}]
		}
	});
