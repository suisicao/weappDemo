const config = require('config.js');
const api = require('lib/api.js');
const request = require('lib/request.js');
const storage = require('lib/storage.js');
App({
  // onLaunch: function() {
  //   wx.login({
  //     success: function(res) {
  //       if (res.code) {
  //         //code换取id
  //           request({ 
  //                   method: 'POST', 
  //                   header: {  
  //                   "content-type":               "application/x-www-form-urlencoded" 
  //               }, 
  //                   url: api.getUrl('/security/register/init'),
  //                   data: { 
  //                       code: res.code
  //                   }
  //           }).then((resp) => {
  //             console.log(resp)
  //               storage.setStorage({
  //                 key: 'openId',
  //                 data: resp.openId,
  //               }).then((ress) => {
  //                  if(resp.resCode=='0000'){
  //                   wx.redirectTo(
  //                     { url: 'pages/portal/myAccount' });
  //                   }
  //                  if(resp.resCode=='0001'){
  //                     wx.redirectTo({ 
  //                       url: 'pages/register/registerOne' });
  //                   }
  //               })
  //           })
  //       } else {
  //         console.log('获取用户登录态失败！' + res.errMsg)
  //       }
  //     }
  //   });
  // }
})