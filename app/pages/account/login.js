Page({
data:{
        phoneValue:'',
        yzmValue:'',
        disabled:false,
        showClose:'none',
        showActive:'none',
        showGrey:'',
        showPswdsrc:'../../images/loginbg-close.png',
        src:'../../images/close.png',
      loginHead:'../../images/login-head.png'
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
    }
});