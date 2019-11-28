const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");
const webpack = require("webpack");
const Chalk = require('chalk')
const Yargs = require('yargs')
const md5 = require('md5')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var { argv } = Yargs

var shindousaigo = 123

var webpackConfig = {

	entry: {
		sdk: ['./index.js'],
		// direct: ['./direct.js'],
		// sdk2: ['./sdk2.ts'],
		// sdk2: ['./src/SDK.ts'],
		// instant: ['./src/FBinstantSDK.ts'],
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			sdk2: path.join(__dirname, 'src/sdk2'),
			Base: path.join(__dirname, 'src/Base'),
			SDK: path.join(__dirname, 'src/SDK'),
			FBinstant: path.join(__dirname, 'src/FBinstant')
		}
	},

	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		chunkFilename: '[name].js',
		// publicPath: 'http://sdk-test.changic.net.cn:8191/sdk-demo/'
		publicPath: '//sdk-android-vndbjh.bilivfun.com/h5sdk/dbjh/'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'es2015',
								'react'
							]
						}
					},

				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.ts$/,
				use: [
					'ts-loader'
				]
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: './img'
						}
					}
				]
			}
		]
	},

	plugins: [
		// new HtmlWebpackPlugin({
		// 	filename: "demo.html",
		// 	chunks: ['sdk'],
		// 	template: "./template/demo.html"
		// }),
		new HtmlWebpackPlugin({
			filename: "index.html",
			chunks: ['sdk'],
			template: "./template/index.html",
		}),
		// new HtmlWebpackPlugin({
		// 	filename: "direct.html",
		// 	chunks: ['direct'],
		// 	template: "./template/direct.html"
		// }),


		new webpack.ProvidePlugin({
			md5: 'md5',
			// $: 'jquery'
		}),
		// new webpack.DefinePlugin(definePlugin),

	],

	devServer: {
		contentBase: path.join(__dirname, 'build'),
		inline: true,
		port: 6999,
		// https: true
	}
}

argv.mode === 'production' && webpackConfig.plugins.push(
	new CleanWebpackPlugin(path.join(__dirname, 'build', 'js', '**/*'))
)


module.exports = webpackConfig
