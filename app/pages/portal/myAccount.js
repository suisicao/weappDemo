const config = require('../../config.js');
const api = require('../../lib/api.js');
const request = require('../../lib/request.js');
const storage = require('../../lib/storage.js');
Page({
  data:{
    openId:'',
    avatarUrl: "../../images/myacc-headpic.png",
    cardcenterImg:"../../images/kquan.jpg",
    name:'',
    lastTime:'',
    remindAccount:'',
    auth:'0'

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
      storage.getStorage({
          key: 'avatarUrl'
      }).then((ress) => {
          this.setData({
              avatarUrl:ress
      });
      });
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
          url: api.getUrl('/security/portal/indexIframe'),
          data: { 
              openId:ress
          }
        }).then((resp) => {
          console.log(resp)
          var datey= new Date(resp.data.lastLoginDate);
          var date=datey.getFullYear()+"-"+parseInt(datey.getMonth()+1)+"-"+datey.getDate()+" "+datey.getHours()+":"+datey.getMinutes()+":"+datey.getSeconds();
          var name=resp.data.name;
          var phone=resp.data.bindPhone;
          var balance=resp.data.balance;
          if(!name){
            name="亲";
          }
          if(!balance){
            balance="0.00";
          }
           this.setData({
              name:name,
              phone:phone,
              lastTime:date,
              remindAccount:balance,
              auth:resp.data.auth
          });
        })    
      })
  },
  auth:function(e) {
    if(this.data.auth==0){
        wx.showModal({
            title: '',
            content: '请先进行实名验证',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({ url: '../register/auth' });
              }
          }
          },)
        return;
    }
  },
  order:function() {
    wx.navigateTo({ url: '../orderList/order' });
  },
  phoneRecharge:function() {
    if(this.data.auth!=0){
    wx.navigateTo({ url: '../actlist/phoneRecharge/one' });
    }
  }
})