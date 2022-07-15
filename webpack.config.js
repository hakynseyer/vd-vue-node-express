const path = require("path");
const fs = require("fs");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { VueLoaderPlugin } = require("vue-loader");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

require("dotenv").config({ path: "./.env" });

const viewsJS = {};
const viewsTwig = {};

switch (process.env.CLIENT_MODE) {
  case "spa":
    let file = path.resolve(
      __dirname,
      `./${process.env.WEBPACK_PATH_VIEWS}/../app`
    );

    if (fs.existsSync(`${file}.js`)) viewsJS["app"] = `${file}.js`;
    else if (fs.existsSync(`${file}.ts`)) viewsJS["app"] = `${file}.ts`;
    break;
  case "ssr":
    fs.readdirSync(
      path.resolve(__dirname, `./${process.env.WEBPACK_PATH_VIEWS}`)
    ).forEach((view) => {
      let file = path.join(
        __dirname,
        `./${process.env.WEBPACK_PATH_VIEWS}`,
        view,
        `${view}`
      );

      if (fs.existsSync(`${file}.js`)) viewsJS[view] = `${file}.js`;
      else if (fs.existsSync(`${file}.ts`)) viewsJS[view] = `${file}.ts`;

      viewsTwig[view] = path.join(
        __dirname,
        `./${process.env.WEBPACK_PATH_VIEWS}`,
        view,
        `${view}.twig`
      );
    });

    break;
}

const outputFilename = () => {
  let output = "";

  switch (process.env.CLIENT_MODE) {
    case "spa":
      output = process.env.MODE === "dev" ? "index.js" : "index-[hash].js";
      break;
    case "ssr":
      output = process.env.MODE === "dev" ? "[name].js" : "[name]-[hash].js";
      break;
  }

  return output;
};

const outputFilenameCss = () => {
  let output = "";

  switch (process.env.CLIENT_MODE) {
    case "spa":
      output =
        process.env.MODE === "dev"
          ? "../css/index.css"
          : "../css/index-[hash].css";
      break;
    case "ssr":
      output =
        process.env.MODE === "dev"
          ? "../css/[name].css"
          : "../css/[name]-[hash].css";
      break;
  }

  return output;
};

const webpackConfig = {
  watch: process.env.MODE === "dev" ? true : false,
  mode: process.env.MODE === "dev" ? "development" : "production",
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json", ".sass", ".scss"],
    alias: {
      "@Views": path.resolve(__dirname, `./${process.env.WEBPACK_PATH_VIEWS}`),
      "@Components": path.resolve(
        __dirname,
        `./${process.env.WEBPACK_PATH_COMPONENTS}`
      ),
      "@Assets": path.resolve(
        __dirname,
        `./${process.env.WEBPACK_PATH_ASSETS}`
      ),
      "@TS": path.resolve(__dirname, `./${process.env.WEBPACK_PATH_TS}`),
    },
  },
  entry: viewsJS,
  output: {
    filename: outputFilename(),
    path: path.resolve(__dirname, `./${process.env.WEBPACK_PATH_PUBLIC}/js`),
    publicPath:
      process.env.BROWSER_SYNC === "proxy"
        ? `${process.env.HOST_BACKEND}/${process.env.WEBPACK_PATH_PUBLIC}/js`
        : "js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            // plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "vue-style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.pug$/,
        loader: "pug-plain-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: outputFilenameCss(),
      chunkFilename: "[id].css",
    }),
    new Dotenv(),
    new VueLoaderPlugin(),
    // Para remover Warning de Vue en la consola JS
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};

// BrowserSync
if (process.env.BROWSER_SYNC !== "none") {
  const browserSyncOptions = {
    host: process.env.HOST_CLIENT,
    port: process.env.HOST_CLIENT_PORT,
    open: false,
    files: [path.join(__dirname, `./${process.env.WEBPACK_PATH_PUBLIC}/*html`)],
  };

  if (process.env.BROWSER_SYNC === "proxy") {
    browserSyncOptions["proxy"] = {
      target: `${process.env.HOST_BACKEND}`,
    };
  } else if (process.env.BROWSER_SYNC === "client") {
    browserSyncOptions["server"] = {
      baseDir: [path.join(__dirname, `./${process.env.WEBPACK_PATH_PUBLIC}`)],
    };
  }

  webpackConfig.plugins.push(new BrowserSyncPlugin(browserSyncOptions));
}

// HtmlWebpackPlugin
const htmlWebpackPluginOptions = (key) => {
  options = {
    filename: key === "app" ? "../index.html" : `../${key}.html`,
    inject: false,
    hash: true,
    cache: false,
    chunks: [key],
    minify: {
      collapseWhitespace: process.env.MODE === "dev" ? false : true,
      keepClosingSlash: process.env.MODE === "dev" ? false : true,
      removeComments: process.env.MODE === "dev" ? false : true,
      removeRedundantAttributes: process.env.MODE === "dev" ? false : true,
      removeStyleLinkTypeAttributes: process.env.MODE === "dev" ? false : true,
      useShortDoctype: process.env.MODE === "dev" ? false : true,
    },
  };

  if (process.env.BROWSER_SYNC === "client") {
    options["template"] = path.resolve(__dirname, "./main.html");

    options["templateParameters"] = {
      server: {
        title: "FRONTEND DEVELOPER",
        creador: process.env.WEBPACK_CREATOR,
        creadorEmail: process.env.WEBPACK_CREATOR_EMAIL,
        host: process.env.HOST_BACKEND,
      },
    };
  } else {
    // Por si se desea renderizar las vistas de cada view DEPRECATED
    // template: path.resolve(__dirname, viewsTwig[key]),

    options["template"] = path.resolve(
      __dirname,
      "./vendor/jrs/arlequin/src/Templates/Twig/main-ssr.twig"
    );
  }

  return options;
};

// Definiendo SPA o SSR
switch (process.env.CLIENT_MODE) {
  case "spa":
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin(htmlWebpackPluginOptions("app"))
    );
    break;
  case "ssr":
    for (const key of Object.keys(viewsTwig)) {
      webpackConfig.plugins.push(
        new HtmlWebpackPlugin(htmlWebpackPluginOptions(key))
      );
    }
    break;
}

module.exports = webpackConfig;
