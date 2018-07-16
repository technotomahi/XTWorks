const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm
const path = require("path");

module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    filename: "bundle.js",
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      //{test: /\.scss$/, loader: ['style-loader' , 'css-loader', 'sass-loader'], exclude: /node_modules/},
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  mode: "development"
};
