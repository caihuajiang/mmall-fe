var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
var getHtmlConfig = function(name,title){
    return {
        template : './src/view/'+name+'.html',
        filename:'view/'+name+'.html',
        favicon:'./favicon.ico',
        title:title,
        inject:true,
        hash:true,
        chunks:['common',name]//自动引入的文件 name指的是entry入口名 即对应的文件
    }
}

var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
        'result': ['./src/page/result/index.js']
    },
    output:{
        path:'./dist',
        publicPath:'/dist/',
        filename:'js/[name].js'//name 就是entry入口的名字
    },
    externals:{
        'jQuery':'window.jQuery'
    },
    module:{
        loaders:[
           { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
           { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
           { test: /\.string$/,loader:'html-loader'}
        ]
    },
    resolve:{
        alias:{
            node_modules:__dirname+'/node_modules',
            util:__dirname+'/src/util',
            image:__dirname+'/src/image',
            service:__dirname+'/src/service',
            page:__dirname+'/src/page'
        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
    ]
}
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}
module.exports = config;