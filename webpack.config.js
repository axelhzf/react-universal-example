var path = require("path");

module.exports = {
  entry: {
    app: ["./src/js/client.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel"
      }
      //{test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
    ]
  }
};