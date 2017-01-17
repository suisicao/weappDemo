// pages/register/registerTwo.js
Page({
  data:{
    receiveYzm:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
        var that=this;
        var time=60;
        var daoji=setInterval(function(){
       time--;
       if(time===0){
            that.setData({
                receiveYzm:'重新获取(60)'
            })
        clearInterval(daoji);
       }
       else{
          that.setData({
              receiveYzm:'重新获取('+time+')'
          })
       }
      
    },1000);
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
  gotoRegthree() {
      wx.navigateTo({ url: '../register/registerThree' });
  }
})