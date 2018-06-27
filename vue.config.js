const webpack = require("webpack");
module.exports = {
    devServer:{
        proxy:{
            '/api': {
                target: 'http://10.80.13.245:8888',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''//这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
                    //比如我要调用'http://40.00.100.133:3002/user/login'，直接写‘/api/user/login'即可
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