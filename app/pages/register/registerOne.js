const config = require('../../config.js');
const request = require('../../lib/request.js');
const api = require('../../lib/api.js');
Page({
    data:{
        src:'../../images/close.png',
        variimg:'../../images/yanzhengma.jpg',
        disabled:false,
        showClose:'none',
        showGrey:'',
        showActive:'none',
        showYzm:'none'
    },
    checkPhone:function(e) {
        var value = e.detail.value;
        var isPhone =/^(13[0-9]{9})$|^(14[0-9]{9})$|^(15[0-9]{9})$|^(18[0-9]{9})$|^(17[0-9]{9})$/;
        if(value!=""){
             this.setData({
                showClose:''
            })
        }
        else{
             this.setData({
                showClose:'none'
            })
        }
        if(isPhone.test(value)){
            this.setData({
                showGrey:'none',
                showActive:''
            })
        }
        else{
            this.setData({
                showGrey:'',
                showActive:'none'
            })
        }
    },
    clearPhone:function() {
        this.setData({
            inputValue:'',
            showClose:'none'
        })
    },
    showYzmfunc:function() {
        this.setData({
            disabled:'disabled',
            showYzm:'',
            showClose:'none'
        })
    },
    gotoRegtwo:function() {
        wx.navigateTo({ url: '../register/registerTwo' });
    }
});
