/*------- PostCSS imports --------*/

var autoprefixer = require('autoprefixer'),
  rucksack = require('rucksack-css'),
  cssVars = require('postcss-css-variables'),
  imports = require('postcss-import'),
  nesting = require('postcss-nested'),
  mixins = require('postcss-sassy-mixins'),
  colourFunctions = require('postcss-colour-functions'),
  mqPacker = require('css-mqpacker');

/*--------------------------------*/

var path = require("path");

module.exports = {
  entry: {
    app: [
      './src/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style','css','postcss']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react'] }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ]
  },
  resolve: {
      extensions: ['', '.js', ".html", ".css"]
  },
  postcss: function () {
    return [imports,
            nesting,
            cssVars,
            mixins,
            colourFunctions,
            autoprefixer({ browsers: ['last 5 versions'] }),
            rucksack({ fallbacks: true }),
            mqPacker];
  },
  devServer: {
    inline: true,
    stats: { colors: true },
  }
};