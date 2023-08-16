// 获取文件路径
const Path = require('path')

// 引入生成 Html文件 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

//引入清除打包文件 clean 插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack中所有配置都应该写在modeule.exports中
module.exports = {

    mode: 'none',

    // 指定入口文件
    entry: './src/index.ts',

    // 指定打包配置
    output: {
        // 指定打包文件所在目录
        path: Path.resolve(__dirname, 'dist'),
        // 指定打包主文件名
        filename: 'index.js',
        //告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    // 指定打包使用的模块
    module: {
        // 模块规则
        rules: [
            // 设置ts文件处理
            {
                // test 指定规则生效的文件
                test: /\.ts$/,
                // 指定要使用的loader

                use: [
                    // 配置babel
                    {
                        //指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            //设置预定义的环境
                            presets: [[
                                //指定环境的插件
                                "@babel/preset-env",
                                // 配置信息
                                {
                                    // 要兼容的目标浏览器及版本
                                    targets: {
                                        "chrome": "58",
                                        "ie": "11"
                                    },
                                    //指定corejs的版本
                                    "corejs": "3",
                                    //使用corejs的方式 "usage"  表示按需加载
                                    "useBuiltIns": "usage"
                                }
                            ]]


                        }
                    },
                    'ts-loader',
                ],
                // 要排除文件的规则
                exclude: /node_modules/,
            },
            // 设置less文件处理
            {
                // test 指定规则生效的文件
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    //  引入postcss
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 [
                    //                     'postcss-preset-env',
                    //                     {
                    //                         browsers: 'last 2 versions',//兼容每个浏览器最新的两个版本
                    //                     },
                    //                 ],
                    //             ],
                    //         },
                    //     },
                    // },
                    'less-loader',
                ],
            }

        ]
    },







    // 使用插件
    plugins: [



        //使用清除打包文件插件
        new CleanWebpackPlugin(),

        // 自动生成 index.html 文件
        // new HtmlWebpackPlugin({ title: '自定义网页title标签内容' })
        // 自自定义生成 index.html 文件
        new HtmlWebpackPlugin({ template: './src/index.html' }),


    ],

    // 用来设置引用模块，可以将这些文件识别为模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}