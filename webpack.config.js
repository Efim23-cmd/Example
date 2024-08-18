const path = require('path');
const сopy = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
	src: path.join(__dirname, './src'),
	assets: 'assets',
};

module.exports = {
	mode: 'production',
	entry: '/src/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js',
	},
	module: {
		rules: [
			{
				test: /\.?(css|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'resolve-url-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(svg|jpg|jpeg|gif|png|ico)$/,
				exclude: [/fonts/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: `${PATHS.assets}/images/[name].[ext]`,
						},
					},
				],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				include: [/fonts/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: `${PATHS.assets}/fonts/[name].[ext]`,
						},
					},
				],
			},
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.([cm]?ts)$/,
				use: {
					loader: 'ts-loader',
					options: {
						compilerOptions: {
							noEmit: false,
						},
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.ts'],
	},
	plugins: [
		new сopy({
			patterns: [
				{
					from: path.resolve(__dirname, 'src'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	watch: process.argv.indexOf('--watch') != -1,
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000,
		ignored: /node_modules/,
	},
	devServer: {
		watchFiles: path.join(__dirname, 'src'),
		port: 3000,
	},
};
