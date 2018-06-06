// const path = require('path');
// const autoprefixer = require('autoprefixer');
// const postCssFlexBugsFixes = require('postcss-flexbugs-fixes');
const webpackRenderer = require('electron-webpack/webpack.renderer.config.js');

// const isProd = process.env.NODE_ENV === 'production';

function replaceSassLoader(config) {
  return config;

  // module: {
  //   rules: [
  //     {
  //       test: /\.(scss|sass)$/,
  //       exclude: /node_modules/,
  //       use: [
  //         'style-loader',
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             modules: true,
  //             sourceMap: !isProd,
  //             minimize: isProd,
  //             importLoaders: 1,
  //             localIdentName: '[name]__[local]___[hash:base64:5]'
  //           }
  //         },
  //         {
  //           loader: 'postcss-loader',
  //           options: {
  //             sourceMap: !isProd,
  //             ident: 'postcss',
  //             plugins: () => [
  //               postCssFlexBugsFixes,
  //               autoprefixer({
  //                 browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
  //                 flexbox: 'no-2009'
  //               })
  //             ]
  //           }
  //         },
  //         {
  //           loader: 'sass-loader',
  //           options: {
  //             data: '
  //               @import "common/stylesheets/variables";
  //               @import "common/stylesheets/mixins";
  //             ',
  //             includePaths: [path.resolve(__dirname, '..', './src')],
  //             sourceMap: !isProd
  //           }
  //         }
  //       ]
  //     // },
  //     // {
  //     //   test: /\.svg$/,
  //     //   exclude: /node_modules/,
  //     //   loader: 'svg-react'
  //     }
  //   ]
  // };
}

module.exports = async (env) => {
  console.log('MRH! IN FUNC', env);
  const config = await webpackRenderer(env);
  return replaceSassLoader(config);
};
