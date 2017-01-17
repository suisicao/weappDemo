
Page({
     data:{
      regSucImg:'../../images/suc.png',
      second:5
    },
    onLoad:function(){
        countDown(this);
    },
    countDown:function(that){
        var nowsec=that.data.second;
        console.log(nowsec+"kk/n");
        if(nowsec==0){
            gotoHome();
        }
        else{
            var time=setTimeout(function(){
                that.setData({
                second:nowsec--
                 });
                 countDown(that);           
        },1000)
        }       
    },
     gotoHome:function() {
        wx.navigateTo({ url: '../portal/myAccount' });
    } 
});













   