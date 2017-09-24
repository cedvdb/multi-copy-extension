const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: {
		background: [ "./src/scripts/background.js" ],
		content_script: [ "./src/scripts/content_script.js" ],
		styles: ["./src/styles/styles.scss"],
		popup: ["./src/scripts/popup.js"]
	},
  output: {
    "path": __dirname + "/dist",
    "filename": "[name].js",
    "chunkFilename": "[id].chunk.js"
	},
	module:{
		rules: [
			{
				test: /\.scss$/,
				use: [{
							loader: "style-loader" // creates style nodes from JS strings
					}, {
							loader: "css-loader" // translates CSS into CommonJS
					}, {
							loader: "sass-loader" // compiles Sass to CSS
					}
				]
			},
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader?name=[name].[hash:20].[ext]"
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      }
		]
	},
  plugins: [ 
		new UglifyJSPlugin(),
		new HtmlWebpackPlugin({
		"template": "./src/popup.html",
		"filename": "./popup.html",
		"excludeChunks": ["background", "content_script"]
		}),
		new CopyWebpackPlugin([
			// {output}/file.txt
			{ from: './src/manifest.json' },
			{  context: './src', from: "./assets/**/*", to: ""}
		])
	]
};