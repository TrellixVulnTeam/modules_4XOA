const path = require("path");
const { HotModuleReplacementPlugin, container: { ModuleFederationPlugin } } = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const EsLintPlugin = require(eslint-webpack-plugin);

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".json", ".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    contentBase: "./build",
    port: 3000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
    }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin,
    new ModuleFederationPlugin({
      name: 'app1',
      library: { type: "var", name: "VideoPlugin"},
      filename: "remoteEntry.js",
      exposes: {
        "./Box": "./src/components/Box",
      },
      shared: ["react", "react-dom"],
    }),
    // new EsLintPlugin({
    //   extensions: ["js", "jsx", "ts", "tsx"],
    // }),
  ]
};
