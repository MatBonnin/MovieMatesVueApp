const webpack = require("webpack");
module.exports = {
  // ...
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        VUE_APP_API_URL: "test",
      },
    }),
  ],
  resolve: {
    fallback: {
      fs: require.resolve("fs-webpack-proxy"),
      path: require.resolve("path-webpack"),
      os: require.resolve("os-browserify/browser"),
    },
  },
};
