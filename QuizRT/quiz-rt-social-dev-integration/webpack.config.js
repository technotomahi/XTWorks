const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const glob = require('glob');
const path = require('path');
const outputDirectory = "dist";

var config = {
  entry: ['./src/client/app.js',
    'babel-polyfill',
    './src/client/styles/scss/main.scss'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      //{
      //  enforce: 'pre',
      //  test: /\.js?$/,
      //  exclude: [/node_modules/],
      //  loader: 'eslint-loader',
      //  options: {
      //    fix: true,
      //  },
      //},
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'stage-0'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // compiles Sass to CSS'
            options: {
             includePaths: glob.sync('node_modules').map((d) => path.join(__dirname, d))
           }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap'
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      { 
        test: /\.js$/, loader: 'exports-loader' 
      }, {
        test: /\.(jpe?g|png|gif|svg|jpg)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img/',
                    publicPath: 'img/'
                }
            }
        ]
    }]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api/**": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true
      },
      "/socket.io/**": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Waves: 'node-waves',
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin([outputDirectory]),
  ],
  devtool: 'source-map',
};
config.node = { fs: 'empty' };
module.exports = config;
