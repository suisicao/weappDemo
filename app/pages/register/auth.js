// pages/register/auth/auth.js
Page({
  data:{
    cardHolderName:'',
    cardHolderId:'',
    payPwd:'',
    payPwdtwo:''

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
  checkName:function(e){
     this.setData({
       cardHolderName:e.detail.value
     })
  },
  checkId:function(e){
      this.setData({
       cardHolderId:e.detail.value
     })
  },
  checkPwd:function(e){
      this.setData({
       payPwd:e.detail.value
     })
  },
  checkPwdtwo:function(e){
      this.setData({
       payPwdtwo:e.detail.value
     })
  },
  gotoResult:function(){
        var cardHolderName=this.data.cardHolderName;
      	var cardHolderId=this.data.cardHolderId;
        var payPwd=this.data.payPwd;
        var payPwdtwo=this.data.payPwdtwo;
        if(cardHolderName==""){
    			wx.showModal({
            title: '',
            content: '请输入姓名',
            showCancel:false
          })
        return;
      }
    		var isIdentify = /^(\d{14}|\d{17})(\d|[xX])$/;
    		if(!isIdentify.test(cardHolderId)){
    			wx.showModal({
            title: '',
            content: '请输入正确身份证号',
            showCancel:false
          })
        return;
      }
       	var isZhifumima =/^\d{6}$/;
    		if(payPwd==''||!isZhifumima.test(payPwd)){
          wx.showModal({
            title: '',
            content: '支付密码为6位数字',
            showCancel:false
          })
        return;
    		}
        if(payPwd!=payPwdtwo){
          wx.showModal({
            title: '',
            content: '请输入相同支付密码',
            showCancel:false
          })
        return;
    		}
        wx.navigateTo({ url: '../register/authSuc' });

  }
})