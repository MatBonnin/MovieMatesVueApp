const { defineConfig } = require("@vue/cli-service");
const Dotenv = require("dotenv-webpack");
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
  configureWebpack: {
    devtool: "source-map", // Ajout de cette option pour générer des fichiers source maps
    plugins: [new Dotenv()],
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  pwa: {
    name: "MovieMates",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configuration du plugin workbox
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc est requis en mode InjectManifest.
      swSrc: "./src/service-worker.js",
      // ...autres options de Workbox...
    },
  },
});
