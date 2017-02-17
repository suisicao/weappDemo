const Promise = require('es6').Promise;
module.exports = (options) => {
    return new Promise((resolve, reject) => {
        options = Object.assign(options, { //把第一个参数和第二个参数合成一个对象，第一个参数为数据对象，第二个参数为回调对象
            success(result) {
                if (result.statusCode === 200) {
                    resolve(result.data);
                } else {
                    reject(result);
                }
            },

            fail: reject,
        });

        wx.request(options);
        //这里传进来的格式应该是{
         //    url: 'test.php', 
          //   data: {
             //    x: '' ,
            //     y: ''
           //   },
             // success: function(res) {
            //    console.log(res.data)
            //  },
            //  fail: reject
        //}
    });
};

//调用方法return request({ method: 'GET', url: api.getUrl('/list') });

//this.getAlbumList().then((resp) => {
            //if (resp.code !== 0) {
                // 图片列表加载失败
               // return;
            //}
//如果成功，就把data传给resp（这里根据具体情况设置），如果失败，就传入result,then里面设置处理方法

//失败写在catch中   //.catch(error => {
      //      console.log('failed', error);
     //   })
