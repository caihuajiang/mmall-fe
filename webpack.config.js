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
        chunks:['common',name]
    }
}

var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
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
        ]
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页'))
    ]
}
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}
module.exports = config;