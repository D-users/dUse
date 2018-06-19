const webpack = require("webpack");

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.80.16.73:8888', //api端口
                changeOrigin: true,   //允许跨域
                pathRewrite: {
                    '^/api': ''
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