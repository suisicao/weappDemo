
Page({
     data:{
      regSucImg:'../../images/suc.png',
      second:5
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
                 that.countDown();           
        },1000)
        }       
    },
     gotoHome:function() {
        wx.redirectTo({ url: '../portal/myAccount' });
    }
});













   