const config = require('../../config.js');
const api = require('../../lib/api.js');
const request = require('../../lib/request.js');
const storage = require('../../lib/storage.js');
Page({
  data:{
    loginPwd:'',
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
  checkPass:function(e){
     this.setData({
       loginPwd:e.detail.value
     })
  },
  gotoResult:function(e){
     var loginPwd=this.data.loginPwd;
     var openId=this.data.openId;
     var isLoginmima=/(^\d*$)|(^[A-Za-z\u4e00-\u9fa5]+$)|(^[^\w\s]+$)/
     if(loginPwd==""||isLoginmima.test(loginPwd)||loginPwd.length>16||loginPwd.length<6){
      wx.showModal({
        title: '',
        content: '登录密码由6-16个字符，需使用字母、数字或符号组合',
        showCancel:false
      })
        return;
      }
      if(e.target.dataset.type==1){
        wx.navigateTo({ url: '../register/regSuc' });
        request({ 
            method: 'POST', 
            header: {  
            "content-type":               "application/x-www-form-urlencoded" 
        }, 
            url: api.getUrl('/security/register/save'),
            data: { 
                loginPwd:loginPwd,
                openId:openId
            }
        }).then((resp) => {
            console.log(resp)
            if(resp.resCode=='0000'){
                wx.navigateTo({ url: '../register/regSuc' });
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
      if(e.target.dataset.type==2){
        wx.navigateTo({ url: '../register/auth' });
      }
  }
})