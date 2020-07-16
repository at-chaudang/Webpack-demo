const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  // Điểm bắt đầu để webpack phân tích thư viện, code, ... của dự án
  entry: "./src/index.js",

  // Cài đặt đầu ra của dự án khi chạy build
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  // test hỗ trợ regex để bạn viết query
  module: {
    rules: [
      // Cài đặt này nghĩa là sẽ dùng thư viện babel-loader để đọc các file js và jsx
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      // Các file css và scss thì dùng css-loader và sass-loader
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass'),
            },
          }
        ]
      },

      // Các file html thì dùng html-loader
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },

  // Khai báo các plugins cho webpack biết
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
