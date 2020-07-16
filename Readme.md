Demo webpack

https://codelearn.io/sharing/tung-buoc-tro-thanh-dev-front-end-xin-phan-1

# Tạo thư mục dự án, khởi tạo dự án
cd $PROJECT_HOME
mkdir FE-UserManagement
npm init

# Cài đặt thư viện webpack
# Thư viện này giúp bạn đóng gói, mã hóa, nén toàn bộ ứng dụng thành 1 / nhiều file nhỏ để deploy lên môi trường thực.
# --save-dev: có nghĩa là các thư viện này chỉ cài đặt ở môi trường phát triển, môi trường thực không dùng đến, các build tool sẽ dựa
# vào đó để biết cần đóng gói những thư viện nào.
npm i webpack webpack-cli --save-dev

# Cài đặt Babel, bạn cần thư viện này để chuyển các mã code ở các phiên bản cao về ES5 và biên dịch code ReactJS sang Javascript thuần túy.
# Lý do chúng ta cần chuyển về phiên bản ES5 là các trình duyệt chưa hỗ trợ đầy đủ tính năng của các phiên bản cao hơn.
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

# Cài đặt thư viện ReactJS
# --save: có nghĩa là bạn cần thư viện này khi chạy thực, yêu cầu các thư viện đóng gói kèm theo thư viện này.
npm i react react-dom -save

# Cài plugins cho webpack, webpack có rất nhiều plugins đi cùng, đây chỉ là một trong những thứ đó
npm i html-webpack-plugin --save-dev

# Thư viện này dùng để khởi tạo server ở local. Server ở phía môi trường DEV là bắt buộc trong quá trình phát triển dự án, 
# nó sẽ giúp chúng ta tạo 1 server tạm như môi trường thực, deploy code và giúp chúng ta có thể xem được code của mình hoạt 
# động như thế nào
npm i webpack-dev-server --save-dev

# Cài các bộ loader khác cho webpack để đọc file css, scss, img, html, ... bạn cần gì thì cứ thêm vào
npm i style-loader css-loader sass-loader node-sass --save-dev

Cấu hình Babel
Việc cấu hình Babel khá đơn giản, bạn tạo 1 file .babelrc ở thư mục gốc của dự án $PROJECT_HOME với nội dung sau

{
    "presets": [
        "@babel/env",
        "@babel/react"
    ]
}

Cấu hình webpack
File cấu hình chính của webpack là webpack.config.js, bạn tạo ra file này và đặt ngay thư mục $PROJECT_HOME của dự án với nội dung sau:

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
Thêm scripts vào package.json
"scripts": {
    "start": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
}
start: Dùng để chạy server phía local, nó sẽ tự động biên dịch, deploy mã nguồn và server tạm cho bạn kiểm thử
build: Dùng để đóng gói dự án chạy ở môi trường thực, các file sẽ được mã hóa, nén, … bởi webpack
OK về cấu hình bạn cần vậy là đủ, bạn thử tạo ra một file src/index.js rồi chạy thử xem nó hoạt động thế nào nhé, hoặc bạn có thể clone bài mẫu ở đây:

cd $PROJECT_HOME

# Lệnh này sẽ checkout duy nhất branch InitWebpack 
git clone --single-branch --branch InitWebpack https://github.com/lapth/FE-User-Management.git

cd FE-User-Management
Chạy thử ở local
npm run start
