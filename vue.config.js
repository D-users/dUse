const webpack = require("webpack");
<<<<<<< HEAD

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.80.16.195:8888', //api端口
                changeOrigin: true,   //允许跨域
                pathRewrite: {
                    '^/api': ''
=======
module.exports = {
    devServer:{
        proxy:{
            '/api': {
                target: 'http://10.80.13.245:8888',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''//这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
                    //比如我要调用'http://40.00.100.133:3002/user/login'，直接写‘/api/user/login'即可
>>>>>>> 3a4ca11c2b3f1c681b9579719a65f4b2480d252b
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