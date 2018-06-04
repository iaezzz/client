const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'sass-loader',
        options: {
          data: '@import "common/stylesheets/variables"; @import "common/stylesheets/mixins";',
          includePaths: [path.resolve(__dirname, '..', './src')]
          // sourceMap: isDev
        }
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react'
      }
    ]
  }
};
