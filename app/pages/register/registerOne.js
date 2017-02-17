const config = require('../../config.js');
const api = require('../../lib/api.js');
const request = require('../../lib/request.js');
const storage = require('../../lib/storage.js');
Page({
    
    data:{
        phoneValue:'',
        yzmValue:'',
        disabled:false,
        showClose:'none',
        showActive:'none',
        showYzm:'none',
        receive:'',
        receivea:'none',
        receiveYzm:'获取验证码',
        checkHint:'',
        openId:'',
        src:'../../images/close.png'
    },
    onReady: function() {
        storage.getStorage({
            key: 'openId'
        }).then((ress) => {
            this.setData({
                openId:ress
            }) 
        })
    },
    checkPhone:function(e) {
       var value = e.detail.value;
        var isPhone =/^(13[0-9]{9})$|^(14[0-9]{9})$|^(15[0-9]{9})$|^(18[0-9]{9})$|^(17[0-9]{9})$/;
        if(value!=""){
             this.setData({
                showClose:''
            })
        }
        else{
             this.setData({
                showClose:'none'
            })
        }
        if(isPhone.test(value)){
                this.setData({
                    receive:'none',
                    receivea:'',
                    showGrey:'none',
                    showActive:'',
                    phoneValue:value                  
                })

        }
        else{
            this.setData({
                showGrey:'',
                showActive:'none'
            })
        }
    },
    clearPhone:function() {
        this.setData({
            phoneValue:'',
            showClose:'none'
        })
    },
    checkYzm:function(e) {
        var value = e.detail.value;
        this.setData({
            yzmValue:value                  
        })
    },
    recAgain:function(){
        var phoneValue=this.data.phoneValue;
        var openId=this.data.openId;
        request({ 
            method: 'POST', 
            header: {  
            "content-type":               "application/x-www-form-urlencoded" 
        }, 
            url: api.getUrl('/security/register/sendVerifyCode'),
            data: { 
                userAccId: phoneValue,
                openId:openId
            }
        }).then((resp) => {
            console.log(resp)
            if(resp.resCode=='0000'){
                this.setData({
                    receive:'',
                    receivea:'none',
                    receiveYzm:'重新获取(59)',
                    disabled:true
                })
                var that=this;
                var time=59;
                var daoji=setInterval(function(){
                time--;
                if(time==0){
                        that.setData({
                            receive:'none',
                            receivea:'',                   
                            receiveYzm:'重新获取(59)',
                            disabled:false
                        })
                    
                    clearInterval(daoji);
                }
                else{
                    that.setData({
                        receiveYzm:'重新获取('+time+')'
                    })
                }
                
                },1000);
            }else{
                wx.showModal({
                    title: '',
                    content: resp.resMsg,
                    showCancel:false
                })
                return;
            }
        })

    },
    gotoRegtwo:function() {
        var phoneValue=this.data.phoneValue;
        var openId=this.data.openId;
        var yzmValue=this.data.yzmValue;
        if(yzmValue==''){
            wx.showModal({
                title: '',
                content: '请输入短信验证码',
                showCancel:false
            })
            return;
        }
        request({ 
            method: 'POST', 
            header: {  
            "content-type":               "application/x-www-form-urlencoded" 
        }, 
            url: api.getUrl('/security/register/createStepOne'),
            data: { 
                userAccId: phoneValue,
                openId:openId,
                mobileCheckCode:yzmValue
            }
        }).then((resp) => {
            console.log(resp)
            if(resp.resCode=='0000'){
                wx.redirectTo({ url: '../register/registerTwo' });
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
});