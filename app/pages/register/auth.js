const config = require('../../config.js');
const api = require('../../lib/api.js');
const request = require('../../lib/request.js');
const storage = require('../../lib/storage.js');
Page({
  data:{
    cardHolderName:'',
    cardHolderId:'',
    payPwd:'',
    payPwdtwo:'',
    openId:'',
    phone:''

  },
  onReady: function() {
      storage.getStorage({
          key: 'openId'
      }).then((ress) => {
          this.setData({
              openId:ress
          });
      request({ 
          method: 'POST', 
          header: {  
          "content-type":               "application/x-www-form-urlencoded" 
      }, 
          url: api.getUrl('/security/register/getPhone'),
          data: { 
              openId:ress
          }
        }).then((resp) => {
          this.setData({
              phone:resp.data
          });
        })  
      })
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
        var openId=this.data.openId;
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

        request({ 
            method: 'POST', 
            header: {  
            "content-type":               "application/x-www-form-urlencoded" 
        }, 
            url: api.getUrl('/security/auth/certification'),
            data: { 
                cardHolderName:cardHolderName,
                cardHolderId:cardHolderId,
                payPwd:payPwd,
                passwordAgain:payPwdtwo,
                openId:openId
            }
        }).then((resp) => {
            console.log(resp)
            if(resp.resCode=='0000'){
               wx.redirectTo({ url: '../register/authSuc' })
            }else{
                wx.showModal({
                    title: '',
                    content: resp.resMsg,
                    showCancel:false
                })
                return;
            }
        })
  }
})