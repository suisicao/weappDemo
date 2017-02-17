const Promise = require('es6').Promise;
module.exports = {
    getStorage:function(options) {
        return new Promise((resolve, reject) => {
            options = Object.assign(options, {
                success(result) {
                    resolve(result.data);
                },
                fail: reject,
            });
            wx.getStorage(options);
        });
    },
    setStorage:function(options) {
        return new Promise((resolve, reject) => {
            options = Object.assign(options, {
                success(result) {
                    resolve(result);
                },
                fail: reject,
            });
            wx.setStorage(options);
        });
    }

};