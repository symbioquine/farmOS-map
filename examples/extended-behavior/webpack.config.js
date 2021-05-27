const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
  entry: {
    // we add an entrypoint with the same name as our name in ModuleFederationPlugin.
    // This merges the two "chunks" together. When a remoteEntry is placed on the page,
    // the code in this 'farmOS-map' entrypoint will execute as part of the remoteEntry startup.
    'farmOS-map-example-ext-behavior': `${__dirname}/src/index.js`,
  },
  output: {
    path: `${__dirname}/dist`,
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'farmOS-map-example-ext-behavior',
      remotes: {
        // Expect the farmOS-map `farmOS-map.js` entrypoint to be in the same location
        // as this example's JS
        'farmOS-map': `farmOS-map@./farmOS-map.js`,
      },
      shared: [
        'ol'
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${__dirname}/static` },
        { from: `${__dirname}/../../dist/*.js`, context: `${__dirname}/../../dist` },
        { from: `${__dirname}/../../dist/*.css`, context: `${__dirname}/../../dist` },
        { from: `${__dirname}/../test/sentinel.html` },
      ],
    }),
  ],
};
