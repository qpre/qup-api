const path = require('path');
const webpack = require('webpack');

const entry = (function () {
  return [
    'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    './src/index',
  ];
})();

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV == 'production' || 'true')),
});

module.exports = {
  entry,
  output: {
    path:       path.join(__dirname, 'dist'),
    filename:   'bundle.js',
    publicPath: '/',
  },
  plugins: [
    definePlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          // 'react-hot',
          'babel',
          'eslint',
        ],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?minimize', 'sass'],
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw'],
        include: __dirname,
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ],
  },
};
