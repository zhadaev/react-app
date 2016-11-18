module.exports = {
	entry: "./entry.js",
	output: {
		filename: "./bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015','react']
				}
			}
		]
	},
	resolve: {
		extensions: ['', '.js']
	},
}