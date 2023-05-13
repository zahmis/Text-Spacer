const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    background: "./background.ts",
    content: "./content.ts",
    popup: "./popup.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
