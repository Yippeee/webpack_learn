//webpack 配置文件符合 commonJs模块规范(与es5的差别所在)

var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    //简化生成适合webpack打包的html

    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");


console.log(process.env.NODE_ENV)

module.exports = {
    // 通过制定webpack的入口文件
    // webpack将会根据这个来进行打包
    entry: process.env.NODE_ENV === 'production' ? './webpack.entry.js' : [// 给webpack-dev-server启动一个本地服务，并连接到8080端口
        'webpack-dev-server/client?http://localhost:8080',
        // 给上面启动的本地服务开启自动刷新功能，'only-dev-server'的'only-'意思是只有当模块允许被热更新之后才有热加载，否则就是整页刷新
        'webpack/hot/only-dev-server',
        './webpack.entry.js',
    ],
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
                use: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
                    :
                    ['style-loader', 'css-loader?sourceMap'] // ?sourceMap 设置了之后,才可以在浏览器中查看到样式在开发文件中的位置
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
    plugins: process.env.NODE_ENV === 'production' ? [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV) // 直接传字符串的话webpack会把它当作代码片段来编译，这里用JSON.stringify()做字符串化处理
        })
    ]
        :
        [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            })
        ],
    // 定义webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        // 静态文件目录位置，只有当你需要在webpack-dev-server本地服务器查看或引用静态文件时用到。类型：boolean | string | array, 建议使用绝对路径
        hot: true,
        // 模块热更新。依赖于HotModuleReplacementPlugin
        noInfo: false,
        // 在命令行窗口显示打包信息
    },
    devtool: 'source-map'
}