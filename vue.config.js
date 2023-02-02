const { defineConfig } = require("@vue/cli-service");
const fs = require("fs");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    https: {
      key: fs.readFileSync("localhost-key.pem"),
      cert: fs.readFileSync("localhost.pem"),
    },
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
