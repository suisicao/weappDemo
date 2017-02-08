const config = require('../../config.js');
const api = require('../../lib/api.js');
const request = require('../../lib/request.js');

Page({
    data:{
        inputValue:'',
        yzmValue:'',
        msgyzmValue:'',
        src:'../../images/close.png',
        variimg:'',
        disabled:false,
        showClose:'none',
        showGrey:'',
        showActive:'none',
        showYzm:'none',
        receive:'',
        receivea:'none',
        receiveYzm:'获取验证码',
        checkHint:''
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
                    inputValue:value                  
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
            inputValue:'',
            showClose:'none'
        })
    },
    showYzmfunc:function() {
        var url='/servlet/validateCodeServlet?validateName=sessionRegVariCode';
        this.setData({
            disabled:'disabled',
            showYzm:'',
            showClose:'none',
            variimg:api.getUrl(url) 
        })
    },
    changeYzmfunc:function() {
        var url='/servlet/validateCodeServlet?validateName=sessionRegVariCode&t=' + new Date().getTime();
        this.setData({
            variimg:api.getUrl(url)
        })
    },
    checkYzm:function(e) {
        var value = e.detail.value;
        this.setData({
            yzmValue:value                  
        })
    },
    gotoRegtwo:function() {
        var inputValue=this.data.inputValue;
        var yzmValue=this.data.yzmValue;
        var url='/servlet/validateCodeServlet?validateName=sessionRegVariCode&t=' + new Date().getTime();
        if(!/^\d{4}$/.test(yzmValue)){
            wx.showModal({
                title: '',
                content: '请输入正确图形验证码',
                showCancel:false
            })
            return;
        }
        console.log(inputValue)
        console.log(yzmValue)
        request({ 
            method: 'POST', 
            header: {  
            "content-type":               "application/x-www-form-urlencoded" 
          }, 
            url: api.getUrl('/security/register/sendVerifyCode'),
            data: { 
                userAccId:inputValue,
                regVariCode:yzmValue,
            }
        }).then((resp) => {
            console.log(resp)
        if(resp.resCode!='0000'){
            this.setData({
                variimg:api.getUrl(url)
            })
            wx.showModal({
                title: '',
                content: resp.resMsg,
                showCancel:false
            })
            return;
        }
        wx.navigateTo({ url: '../register/registerTwo' });
        })
        
    },
  recAgain:function(){
         this.setData({
              receive:'',
              receivea:'none',
              receiveYzm:'重新获取(59)'
          })
          var that=this;
          var time=59;
          var daoji=setInterval(function(){
          time--;
          if(time==0){
                that.setData({
                    receive:'',
                    receivea:'none',                   
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
  setMsgYzm:function(e){
      var yzmvalue = e.detail.value;
           this.setData({
             checkHint:'',
             msgyzmValue:yzmvalue
          })
         
  },
  gotoRegthree:function(e) {
      var phone=this.data.inputValue;
      var checkHint=this.data.msgyzmValue;
      console.log(phone);
      
        if(checkHint.length<6){
              this.setData({
                   checkHint:'验证码有误，请检查'
                })
        }
        else{
wx.navigateTo({ url: '../register/registerThree' });
        }
      
  }
});