//  Configuration file of webpack
var path = require("path");
var webpack = require("webpack");
var BowerWebpackPlugin = require("bower-webpack-plugin");
var pkg = require(path.join(__dirname, "package.json"));
var dirs = pkg.configs.directories;
var version = process.env.VERSION || pkg.version;
var banner = pkg.name + " v" + version + "\n" +
  "(c) " + new Date().getFullYear() +
  " " + pkg.author.name + "\n" +
  "Released under the " + pkg.license + " License.";

module.exports = {
  entry: {
    "vue-datetime-picker": path.join(__dirname, dirs.src, "vue-datetime-picker.js")
  },
  resolve: {
    root: [__dirname],
    modulesDirectories: [ "lib" ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new BowerWebpackPlugin({
      modulesDirectories: [ "lib" ],
      manifestFiles:      "bower.json",
      includes:           /.*/,
      excludes:           [],
      searchResolveModulesDirectories: true
    }),
    new webpack.BannerPlugin(banner)
  ],
  output: {
    path: path.join(__dirname, dirs.dist),
    filename: "[name].js",
    sourceMapFilename: "[file].map"
  }
};
