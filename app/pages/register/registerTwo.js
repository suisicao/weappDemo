// pages/register/registerTwo.js
Page({
  data:{
    receive:'',
    receivea:'none',
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
       if(time==0){
            that.setData({
                receive:'none',
                receivea:'',
                receiveYzm:'重新获取(59)'
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
  recAgain:function(){
         this.setData({
              receive:'',
              receivea:'none'
          })
          var that=this;
          var time=59;
          var daoji=setInterval(function(){
          time--;
          if(time==0){
                that.setData({
                    receive:'none',
                    receivea:'',
                    receiveYzm:'重新获取(59)'
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
  gotoRegthree:function() {
      wx.navigateTo({ url: '../register/registerThree' });
  }
})