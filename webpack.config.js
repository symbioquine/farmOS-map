const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SaveRemoteFilePlugin = require('save-remote-file-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const info = require('./package.json');

module.exports = {
  entry: {
    // we add an entrypoint with the same name as our name in ModuleFederationPlugin.
    // This merges the two "chunks" together. When a remoteEntry is placed on the page,
    // the code in this 'farmOS-map' entrypoint will execute as part of the remoteEntry startup.
    'farmOS-map': `${__dirname}/src/main.js`,
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: 'warning',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(`farmOS-map ${info.version}`),
    new SaveRemoteFilePlugin([
      {
        url: 'https://raw.githubusercontent.com/openlayers/openlayers.github.io/master/en/v6.5.0/css/ol.css',
        filepath: 'ol.css',
        hash: false,
      },
    ]),
    new ModuleFederationPlugin({
      name: 'farmOS-map',
      library: {
        type: 'assign-properties',
        name: ['farmOS', 'map', 'container'],
      },
      shared: [
        'ol'
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './examples/simple-html-consumer/static' },
      ],
    }),
  ],
};
