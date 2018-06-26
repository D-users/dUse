const webpack = require("webpack");

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://cnodejs.org', //api端口
                changeOrigin: true,   //允许跨域
                pathRewrite: {
                    '^/api': '/' //路径重写
                }
            }
        }
    },
    configureWebpack: {
        //配置webpack
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: "jquery",
                $: "jquery"
            })
        ]
    }
}