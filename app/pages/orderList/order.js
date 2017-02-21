const config = require('../../config.js');
const api = require('../../lib/api.js');
const request = require('../../lib/request.js');
const storage = require('../../lib/storage.js');
Page({
  data:{
    openId:'',
    orders:{
        date:'',
        time:'',
        amount:'',
        detail:'',
        status:''
    },
    hasMore:true,
    pageNum:1
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
      storage.getStorage({
          key: 'openId'
      }).then((ress) => {
          this.setData({
              openId:ress
            });
      request({ 
          method: 'POST', 
          header: {  
          "content-type":                        "application/x-www-form-urlencoded" 
          }, 
          url: api.getUrl('/myBill/myBillList'),
          data: { 
              openId:'d3d510d2d73f11926149810c63b2959b',
              pageNum: 1
          }
        }).then((resp) => {
          console.log(resp);
          console.log(this);

          var orders = resp.data; 
          if(resp.data.length===0){
              
              this.setData({
                hasMore:false
              });
          }else if(resp.data.length>10){
                
          }

          for(var i=0;i<orders.length;i++){//金额转换
                if(orders[i].txnAtAll!=''){
                    orders[i].txnAtAll = (orders[i].txnAtAll/100).toFixed(2);
                }
            }
            for(var i=0;i<orders.length;i++){//日期转换
                if(orders[i].orderDate!=''){
                    var datey = new Date(orders[i].orderDate);
                    var date=datey.getFullYear()+"-"+parseInt(datey.getMonth()+1)+"-"+datey.getDate();
                    var time = datey.getHours()+":"+datey.getMinutes()+":"+datey.getSeconds();
                    orders[i].orderDate = date;
                    orders[i].orderTime = time;
                }
            }
            for(var i=0;i<orders.length;i++){//交易类型
                switch(parseInt(orders[i].stat)){
                    case 1: orders[i].stat = '交易失败';
                    break;
                    case 2:orders[i].stat = '已完成';                                break;
                    case 3:orders[i].stat = '已取消';                                break;
                    case 5:orders[i].stat = '已退款';                                break;
                    case 6:orders[i].stat = '支付超时';                              break;
                    case 8:orders[i].stat = '退款拒绝';                              break;
                    case 9:orders[i].stat = '交易失败';                              break;
                    case 10:orders[i].stat = '交易失败';                             break;
                    case 11:orders[i].stat = '处理中';                               break;
                    case 12:orders[i].stat = '已赠送';                               break;
                    case 13:orders[i].stat = '已退回';                               break;
                    case 14:orders[i].stat = '已收到';                               break;
                    default:orders[i].stat = ''
                }
            }
          this.setData({
              orders: orders
          });
        },(resp)=>{
            //var orders = resp.data;
            this.setData({
              hasMore:false
            });
        })    
      })
  },
    onPullDownRefresh: function () {
        //页面相关事件处理函数--监听用户下拉动作
        console.log('PullDownRefresh');
    },
    scrollEventHandle: function () {
        //页面相关事件处理函数--监听页面滚动
        console.log('scrollEventHandle')
    },
    scrolltolowerEventHandle: function () {
        //页面相关事件处理函数--滚动到页面底部
        console.log('scrolltolowerevent')
    },
    onReachBottom: function () {
        //页面上拉触底事件的处理函数
        var count = this.data.pageNum;
        count = count + 1;
        this.setData({
            pageNum:count
        });
        console.log(count)
        storage.getStorage({
          key: 'openId'
      }).then((ress) => {
          this.setData({
              openId:ress
            });
      request({ 
          method: 'POST', 
          header: {  
          "content-type":                        "application/x-www-form-urlencoded" 
          }, 
          url: api.getUrl('/myBill/myBillList'),
          data: { 
              openId:'d3d510d2d73f11926149810c63b2959b',
              pageNum: count
          }
        }).then((resp) => {
          console.log(resp);
          console.log(this);

        //   var orderlist = this.data.orders;
        //   console.log(orderlist)
        //   orderlist = orderlist.concat(resp.data);
          var orders = resp.data;

          for(var i=0;i<orders.length;i++){//金额转换
                if(orders[i].txnAtAll!=''){
                    orders[i].txnAtAll = (orders[i].txnAtAll/100).toFixed(2);
                }
            }
            for(var i=0;i<orders.length;i++){//日期转换
                if(orders[i].orderDate!=''){
                    var datey = new Date(orders[i].orderDate);
                    var date=datey.getFullYear()+"-"+parseInt(datey.getMonth()+1)+"-"+datey.getDate();
                    var time = datey.getHours()+":"+datey.getMinutes()+":"+datey.getSeconds();
                    orders[i].orderDate = date;
                    orders[i].orderTime = time;
                }
            }
            for(var i=0;i<orders.length;i++){//交易类型
                switch(parseInt(orders[i].stat)){
                    case 1: orders[i].stat = '交易失败';
                    break;
                    case 2:orders[i].stat = '已完成';                                break;
                    case 3:orders[i].stat = '已取消';                                break;
                    case 5:orders[i].stat = '已退款';                                break;
                    case 6:orders[i].stat = '支付超时';                              break;
                    case 8:orders[i].stat = '退款拒绝';                              break;
                    case 9:orders[i].stat = '交易失败';                              break;
                    case 10:orders[i].stat = '交易失败';                             break;
                    case 11:orders[i].stat = '处理中';                               break;
                    case 12:orders[i].stat = '已赠送';                               break;
                    case 13:orders[i].stat = '已退回';                               break;
                    case 14:orders[i].stat = '已收到';                               break;
                    default:orders[i].stat = ''
                }
            }

          var orderlist = this.data.orders;
          console.log(orderlist)
          orderlist = orderlist.concat(resp.data);
          orders = orderlist;
          this.setData({
              orders: orders
          });
        },(resp)=>{
            //var orders = resp.data;
            this.setData({
              hasMore:false
            });
        })    
      })
        
    }
})