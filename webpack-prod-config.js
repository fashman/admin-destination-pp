const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const newDashboard = new Dashboard();
const find = require('find');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const files = find.fileSync('./src/js/');
const entrys = {};
const entrysArr = [];
const re = /[\w\W]*src\/([\w\W]+)\.js$/;

for (let i = 0; i < files.length; i++) {
  if (/\.entry\.js$/.test(files[i])) {
    const filei = files[i].replace(re, '$1');
    entrys[filei] = `./${files[i]}`;
    entrysArr.push(filei);
  }
}

let gitVersion = fs.readFileSync(path.resolve(__dirname, './.git/HEAD'), 'utf8');
gitVersion = gitVersion.split('/heads/')[1].replace(/\s/g, '');
const versionNum = gitVersion.split('/')[1];
if (gitVersion === 'master') {
  console.log(chalk.red.bold('\n🚨  严禁在 master 分支上构建！请拉取日常分支 `daily/x.y.z`！\n'));
  process.exit(0);
} else if (!(/^daily\/\d*\.\d*\.\d*$/.test(gitVersion))) {
  console.log(chalk.red.bold('\n🚨  当前分支不符合 `daily/x.y.z` 的版本规范！如果是开发分支，则不需要构建，请提 MR 到 `daily` 分支！\n'));
  process.exit(0);
}

const config = {
  entry: entrys,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: `//dppstatic.quimg.com/${versionNum}/dist`,
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        keep_fnames: true
      },
      mangle: {
        keep_fnames: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false,
    }),
    // new DashboardPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common/common.js',
      chunks: entrysArr,
      minChunks: Math.ceil(entrysArr.length * 2 / 3),
    }),
    new ExtractTextPlugin('[name].css'),
    new ImageminPlugin({
      pngquant: {
        quality: '100'
      },
      jpegtran: {
        quality: '100'
      }
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.web.js', '.js', '.json', '.jsx', '.less'],
    alias: {
      app: path.resolve(__dirname, 'src/js'),
      style: path.resolve(__dirname, 'src/styles'),
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
        loader: 'url?limit=1024&name=[name]-[sha512:hash:base64:7].[ext]&outputPath=/images/',
      },
    ],
  },
  postcss() {
    return [
      require('precss'),
      require('autoprefixer'),
    ];
  },
};

for (let j = 0; j < entrysArr.length; j++) {
  const pathname = path.basename(entrysArr[j]).split('.')[0];
  const conf = {
    filename: `${pathname}.html`,
    template: './src/template.html',
    inject: 'body',
    favicon: './src/favicon.ico',
    title: pathname,
    hash: false,
    minify: {
      removeComments: true,
      collapseWhitespace: false,
    },
    chunks: ['common', entrysArr[j]],
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = config;
