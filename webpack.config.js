
const { resolve } = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

process.env.NODE_ENV = 'development'

module.exports = {
    entry: [
        './src/js/index.js',
        './src/index.html'
    ],
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // css 加载
            {
                test: /\.css$/,
                use: [
                    // 创建元素的style标签
                    // 'style-loader',

                    //  提取css文件成单独文件
                    MiniCssExtractPlugin.loader,
                    //将css文件整合到js文件
                    'css-loader'
                ]
            },
            //less加载。数组到序  npm i less-loader css-loader style-loader less
            // {  
            //     test: /\.less$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'less-loader'
            //     ]
            // },

            //css url图像 npm i file-loader
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    esModule: false,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs'
                }
            },

            // html img 图像
            {
                test: /\.html$/,
                loader: 'html-loader'
            },

            //打包其他资源
            {
                exclude: /\.(html|css|js|less|jpg)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:8].[ext]',
                    outputPath: 'media'
                }
            },

            /* 语法检查 eslint检查代码书写一致性，语法等。 
             * npm i eslint-loader eslint
             * 语法规则在package.js中eslintConfig设置 "eslintConfig": { "extends": "airbnb-base" }
             * 应用此语法规则: eslint-config-airbnb-base（from github)  It requires eslint and eslint-plugin-import.
             */
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     enforce : 'pre',   //优先执行
            //     loader: 'eslint-loader',
            //     options: {
            //         fix: true //自动修复

            //     }
            // },

            /* js兼容性处理  babel-loader \
             * 1.  @babel/preset: 只能转换基本语法，Promise 等不能转换
             * npm i  babel-loader  @babel/core @babel/preset-env -D\
             * 2. @babel/polyfill: 全部js兼容性处理。 问题:全部作预处理，体积太大
             * 3. corejs ：按需加载 npm i core-js
            */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage', ///按需加载
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9'

                                }
                            }
                        ]
                    ]
                }
            }
        ]

    },
    plugins: [
        // copy 到输出目录，自动引用输出资源
        new HtmlwebpackPlugin(
            {
                template: './src/index.html',
                //压缩html代码
                minify: {
                    collapseWhitespace: true, //删除空格
                    removeComments: true
                }
            }
        ),
        //提取css为单独文件
        new MiniCssExtractPlugin({
            filename: 'css/main.css'

        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin()

    ],
    /*
     * mode为production会在自动压缩js代码
     * mode值: develpment|production
    **/
    mode: 'production', //develpment/product
    //命令： npx wbpack-dev-server。 输出
    devServer: { 
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        hot: true //开启HRR
    }

}