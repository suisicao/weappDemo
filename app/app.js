const config = require('config.js');
const api = require('lib/api.js');
const request = require('lib/request.js');
App({
  onLaunch: function() {
    wx.login({
      success: function(res) {
        if (res.code) {
          //code换取id
          console.log(res.code)
            request({ 
                    method: 'POST', 
                    header: {  
                    "content-type":               "application/x-www-form-urlencoded" 
                }, 
                    url: api.getUrl(''),
                    data: { 
                        code: res.code
                    }
            }).then((resp) => {
                console.log(resp)
            })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})