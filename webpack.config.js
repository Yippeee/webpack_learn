//webpack 配置文件符合 commonJs模块规范(与es5的差别所在)

var path = require('path')
HtmlWebpackPlugin = require('html-webpack-plugin')
//简化生成适合webpack打包的html
ExtractTextPlugin = require("extract-text-webpack-plugin"); //抽取css字符串并生成css文件
module.exports = {
    // 通过制定webpack的入口文件
    // webpack将会根据这个来进行打包
    entry: './webpack.entry.js',
    // 定义webpack打包后的文件名，以及存放路劲
    output: {
        filename: 'webpack.bundle.js',
        path: path.resolve(__dirname, './dist'),
        // 声明资源的引用路劲
        // 会根据这个路劲生成绝对路劲
        publicPath: ''
    },
    // 解析entry选项的基础目录，入口文件（entry）必须在这个文件下
    context: __dirname,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)/,
                use: ['url-loader?limit=10000&name=img/[name].[ext]']
            }
        ]
    },
    plugins: [
        // 剥离HTML文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new ExtractTextPlugin('style.css')
    ]
}