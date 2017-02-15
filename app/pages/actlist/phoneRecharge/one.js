const config = require('../../../config.js');
const api = require('../../../lib/api.js');
const request = require('../../../lib/request.js');
const storage = require('../../../lib/storage.js');
Page({
  data:{
    phonerRchgImg:'../../../images/phone-bg.jpg',
    checkphoneAddr:'',
    phone:'',
    openId:'',
    phoneList:[],
    phoneAddr:'',
    closePay:'../../../images/close.png',
    paywayBalImg:'../../../images/myacc-aimg1.png',
    paywayWxImg:'../../../images/weixin.png',
    showPayway:'none',
    showPswdInput:'none',
    ActPotNum:'0',
    userPayPswd:'',
    showRechargeAmt:'',
    chosenPayway:''
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
          url: api.getUrl('/security/register/getUserInfo'),
          data: { 
              openId:ress
          }
        }).then((resp) => {
            console.log(resp)
          this.setData({
              phone:resp.data.bindPhone
          });
        request({ 
          method: 'POST', 
          header: {  
          "content-type":               "application/x-www-form-urlencoded" 
      }, 
          url: api.getUrl('/actlist/PhoneRecharge/queryPhoneProductList'),
          data: { 
              openId:this.data.openId,
              phone:resp.data.bindPhone
          }
        }).then((resc) => {
          console.log(resc)
          this.setData({
              phoneList:resc.data
          });
        })
        request({ 
          method: 'POST', 
          header: {  
          "content-type":               "application/x-www-form-urlencoded" 
      }, 
          url: api.getUrl('/account/managersession/mobileTelSegment'),
          data: { 
              phoneNo:resp.data.bindPhone
          }
        }).then((resaddr) => {
          console.log(resaddr)
          this.setData({
             phoneAddr:resaddr.data.province+resaddr.data.custType
          });
        })  
        })  
      })
  },
  checkPhone:function(e){
     var value = e.detail.value;
     var isPhone =/^(13[0-9]{9})$|^(14[0-9]{9})$|^(15[0-9]{9})$|^(18[0-9]{9})$|^(17[0-9]{9})$/;
       
    if(isPhone.test(value)){
      this.setData({
        checkphoneAddr:'',
        phone:value              
      });
      request({ 
          method: 'POST', 
          header: {  
          "content-type":               "application/x-www-form-urlencoded" 
      }, 
          url: api.getUrl('/actlist/PhoneRecharge/queryPhoneProductList'),
          data: { 
              openId:this.data.openId,
              phone:this.data.phone
          }
        }).then((resc) => {
          console.log(resc)
          this.setData({
              phoneList:resc.data
          });
        })
     request({ 
          method: 'POST', 
          header: {  
          "content-type":               "application/x-www-form-urlencoded" 
      }, 
          url: api.getUrl('/account/managersession/mobileTelSegment'),
          data: { 
              phoneNo:this.data.phone
          }
        }).then((resaddr) => {
          this.setData({
             phoneAddr:resaddr.data.province+resaddr.data.custType
          });
        })         
    }
    else{
      this.setData({
        checkphoneAddr:'none',
        phoneList:[]               
      })
    }        
  },
  phonecharge:function(e){
      var openId=this.data.openId;
      var phone=this.data.phone;
      var rechargeAmt=e.currentTarget.dataset.price;
      request({ 
          method: 'POST', 
          header: {  
          "content-type":               "application/x-www-form-urlencoded" 
      }, 
          url: api.getUrl('/actlist/PhoneRecharge/queryProdId'),
          data: { 
              openId:openId,
              phone:phone,
              rechargeAmt:rechargeAmt/100
          }
        }).then((rescom) => {
            request({ 
            method: 'POST', 
            header: {  
            "content-type":               "application/x-www-form-urlencoded" 
        }, 
            url: api.getUrl('/portal/gate/phoneRechargeOrder'),
            data: { 
                openId:openId,
                phone:phone,
                rechargeAmt:rechargeAmt/100,
                companyId:rescom.data.companyId,
                prodIsptype:rescom.data.prodIsptype,
                prodProvinceid:rescom.data.prodProvinceid

            }
            }).then((rescharge) => {
                console.log(rescharge)
                if(rescharge.resCode=='0000'){

                }else{
                    wx.showModal({
                        title: '',
                        content: rescharge.resMsg,
                        showCancel:false
                    })
                    return;
                }
            })
        }
             
        
        )
  /**显示设置 */
          this.setData({
            showPayway:'',
            showRechargeAmt:rechargeAmt/100
        });
  },
  closePay:function(e){
       this.setData({
            showPayway:'none',
            showPswdInput:'none',
            ActPotNum:'0',
            userPayPswd:'',
            showRechargeAmt:''  
        });
  },
  chosePayway:function(e){
      var chosenWay=e.currentTarget.dataset.payway;
      if(chosenWay=='wxin'){
           this.setData({
          chosenPayway:this.data.paywayWxImg,
          showPayway:'none',
          showPswdInput:'',
      })
      }
      else{
           this.setData({
          chosenPayway:this.data.paywayBalImg,
          showPayway:'none',
          showPswdInput:'',
      })
      }
     
  },
  PswdInput:function(e){
      var currNum=e.currentTarget.dataset.num;
      var currPswd=this.data.userPayPswd+currNum;
      var actpotNum=this.data.ActPotNum;
      if(actpotNum==6){
          //密码输入完成
           console.log("输入的密码："+this.data.userPayPswd);
      }
      else{
        actpotNum++;
        this.setData({
        ActPotNum:actpotNum,
        userPayPswd:currPswd
        });
      }      
      console.log("当前选择的数字"+currNum+"当前输入密码："+this.data.userPayPswd);
  },
  delActpot:function(e){
      /*删除输入的密码 */
      var that=this;
      var actpotNum=this.data.ActPotNum;
      var currPswd=this.data.userPayPswd;

      if(actpotNum==0){
           this.setData({
           userPayPswd:''
        });
      }
      else{
          currPswd=Math.floor(currPswd/10);
          actpotNum--;
         this.setData({
             ActPotNum:actpotNum,
             userPayPswd:currPswd==0?'':currPswd
          });
      }
        console.log("当前密码："+this.data.userPayPswd+'activepotNum :'+this.data.ActPotNum);

  }
})