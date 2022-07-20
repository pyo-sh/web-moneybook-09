const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getWebpackAliasFromJsconfig = require("./jsconfigToWebpack");
const jsConfig = require("../jsconfig.json");
const alias = getWebpackAliasFromJsconfig(jsConfig.compilerOptions.paths);

const clientPath = Path.resolve(__dirname, "../");

module.exports = {
  entry: {
    app: Path.join(clientPath, "/src/index.js"),
  },
  output: {
    clean: true,
    path: Path.join(clientPath, "../server/public"),
    filename: "js/[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.join(clientPath, "/index.html"),
    }),
  ],
  resolve: {
    alias,
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        type: "asset",
      },
    ],
  },
};
