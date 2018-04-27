import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
// import DashboardPlugin from 'webpack-dashboard/plugin';
const path = require('path');
const find = require('find');

const files = find.fileSync('./src/js/');
const entrys = {};
const entrysArr = [];
const confEntry = [];
const re = /[\w\W]*src([\w\W]+)\.js$/;

for (let i = 0; i < files.length; i++) {
  if (/\.entry\.js$/.test(files[i])) {
    const filei = files[i].replace(re, '$1').replace('/js/page/', '');
    entrys[filei] = [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      `${__dirname}/${files[i]}`
    ];
    entrysArr.push(filei);

    const confe = `src/${files[i]}`;
    confEntry.push(path.resolve(__dirname, confe));
  }
}

const config = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: true,
  entry: entrys,
  target: 'web',
  output: {
    path: `${__dirname}/src`,
    publicPath: '',
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true,
    }),
    // new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.web.js', '.js', '.jsx', '.json', '.less'],
    alias: {
      app: path.resolve(__dirname, 'src/js'),
      style: path.resolve(__dirname, 'src/styles')
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        exclude: /\.mod\.(less|css)/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss?parser=postcss-less')
      },
      {
        test: /\.mod\.(less|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?parser=postcss-less')
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url?limit=10240000',
      },
    ],
  },
  postcss: () => [precss, autoprefixer],
};

// 根据入口js文件生成对应的html文件
for (let j = 0; j < entrysArr.length; j++) {
  const pathname = path.basename(entrysArr[j]).split('.')[0];
  const conf = {
    filename: `${pathname}.html`,
    template: './src/template.html',
    inject: 'body',
    favicon: './src/favicon.ico',
    title: pathname,
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
    chunks: [entrysArr[j]],
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));
}

export default config;
