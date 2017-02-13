// pages/actlist/phoneRecharge/one.js
Page({
  data:{
    phonerRchgImg:'../../../images/phone-bg.jpg',
    checkphoneAddr:'none',
    isChoosen:0
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
  checkPhone:function(e){
     var value = e.detail.value;
        var isPhone =/^(13[0-9]{9})$|^(14[0-9]{9})$|^(15[0-9]{9})$|^(18[0-9]{9})$|^(17[0-9]{9})$/;
       
        if(isPhone.test(value)){
                this.setData({
                  checkphoneAddr:''               
                })      
        }
          else{
            this.setData({
                  checkphoneAddr:'none'               
                })
        }        
  },
  selectPrice:function(e){
    var that = this;
    that.setData({
      isChoosen: !that.data.isChoosen
    });
  }
})