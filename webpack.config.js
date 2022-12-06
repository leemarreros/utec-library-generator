const path = require("path");
var webpack = require("webpack");

var rpcUrlAlchemy =
  "https://polygon-mumbai.g.alchemy.com/v2/THCGgA1_k2Bs7nrcqDBxWh6P8hAa8UyO";
var blockExplorer = "https://mumbai.polygonscan.com/";
var chainName = "Mumbai (Polygon) Testnet";
var networkId = "80001";

const config = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    library: {
      type: "umd",
    },
    clean: true,
    globalObject: "this",
    path: path.resolve(__dirname, "dist"),
  },
  externals: {
    ethers: {
      commonjs: "ethers",
      commonjs2: "ethers",
      amd: "ethers",
      root: "ethers",
    },
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new webpack.DefinePlugin({
      __rpcUrlAlchemy__: JSON.stringify(rpcUrlAlchemy),
      __blockExplorer__: JSON.stringify(blockExplorer),
      __chainName__: JSON.stringify(chainName),
      __networkId__: JSON.stringify(networkId),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = (env) => {
  var isProduction = process.env.NODE_ENV == "production";
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
    config.devtool = "source-map";
  }
  return config;
};
