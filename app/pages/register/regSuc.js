const config = require('../../config.js');
const api = require('../../lib/api.js');
const request = require('../../lib/request.js');
const storage = require('../../lib/storage.js');
Page({
     data:{
      regSucImg:'../../images/suc.png',
      second:5,
      openId:'',
      phone:'',
      tiaozhuan:true
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
    onLoad:function(){
        this.countDown();
    },
    countDown:function(){
        var nowsec=this.data.second;
        var that=this;
        if(nowsec<=0){
            clearTimeout(time);
            this.gotoHome();
        }
        else{
            var time=setTimeout(function(){
                that.setData({
                second:--nowsec
                 });
                 var tiaozhuan=that.data.tiaozhuan;
                 if(tiaozhuan){
                    that.countDown(); 
                 }else{
                    clearTimeout(time); 
                 }
                           
        },1000)
        }       
    },
     gotoHome:function() {
        wx.redirectTo({ url: '../account/login' });
    },
    gotoResult:function() {
        this.setData({
            tiaozhuan:false
        });
        wx.navigateTo({ url: '../register/auth' });
    }
});













   