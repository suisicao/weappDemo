var styleMy= require('../../lib/styleMy.js');
console.log(styleMy.showModal())
Page({
  data:{
    loginPass:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  checkPass:function(e){
     this.setData({
       loginPass:e.detail.value
     })
  },
  gotoResult:function(){
     var tvalue=this.data.loginPass;
     var isLoginmima=/(^\d*$)|(^[A-Za-z\u4e00-\u9fa5]+$)|(^[^\w\s]+$)/
     if(tvalue==""||isLoginmima.test(tvalue)||tvalue.length>16||tvalue.length<6){
      wx.showModal({
        title: '',
        content: '登录密码由6-16个字符，需使用字母、数字或符号组合',
        showCancel:false
      })
        return;
      }
      wx.navigateTo({ url: '../register/regSuc' });
  }
})