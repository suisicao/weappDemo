const config = require('../../config.js');
const api = require('../../lib/api.js');
const request = require('../../lib/request.js');
const storage = require('../../lib/storage.js');
Page({
/*data:{
        phoneValue:'',
        password:'',
        disabled:false,
        showClose:'none',
        showActive:'none',
        showGrey:'',
        src:'../../images/close.png',
        loginHead:'../../images/login-head.png',
        openId:''
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
    checkpass:function(e) {
        var value = e.detail.value;
         this.setData({
           password: value  
        })
    },
    gotoAcc:function() {
        var openId=this.data.openId;
        var userAccId=this.data.phoneValue;
        var loginPwd=this.data.password;
        if(loginPwd==''){
            wx.showModal({
                title: '',
                content: '请输入密码',
                showCancel:false
            })
            return;
        }
        request({ 
            method: 'POST', 
            header: {  
            "content-type":               "application/x-www-form-urlencoded" 
        }, 
            url: api.getUrl('/security/register/login'),
            data: { 
                openId: openId,
                userAccId:userAccId,
                loginPwd:loginPwd
            }
        }).then((resp) => {
            console.log(resp)
            if(resp.resCode=='0000'){
                wx.redirectTo({ url: '../portal/myAccount' }            );
            }else{
                wx.showModal({
                    title: '',
                    content: resp.resMsg,
                    showCancel:false
                })
                return;
            }
        })
    }*/
});