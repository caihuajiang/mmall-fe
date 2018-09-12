require('./index.css')
var _mm = require('util/mm.js');
var _user =require('service/user-service.js');
var _cart =require('service/cart-service.js');
var nav = {
    init:function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this; //this指调用该方法时的对象 
    },
    bindEvent : function(){
        $('.js-login').click(function(){
            _mm.doLogin(); 
        });
         $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    loadUserInfo:function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username)
        },function(err){
            
        })
    },
    loadCartCount:function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0)
        },function(errMsg){
            $('.nav .cart-count').text(0)
        })
    }
}

module.exports = nav.init(); //暴露模块时执行init函数 因为有了return（链式操作） 返回nav 所以暴露的还是nav对象