const webpack = require("webpack");
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 8a329d420ce09512ceaba48c3709cb395403d91c
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.80.16.195:8888', //api端口
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 8a329d420ce09512ceaba48c3709cb395403d91c
