const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    extensions: ['.ts', '.json', '...'],
    alias: {
      core: path.resolve(__dirname, './src/core'),
      components: path.resolve(__dirname, './src/components'),
      helpers: path.resolve(__dirname, './src/helpers'),
      pages: path.resolve(__dirname, './src/pages'),
      styles: path.resolve(__dirname, './src/styles/'),
      asserts: path.resolve(__dirname, './src/asserts/'),
      api: path.resolve(__dirname, './src/api/'),
      services: path.resolve(__dirname, './src/services/'),
      tests: path.resolve(__dirname, './src/tests/'),
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body'
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',

        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        },
      },
    ],
  },
};
