//app.js
const Towxml = require('/towxml/main');   
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.checkSession({
        success:function(res){
          console.log(res);
        },
        fail:function(){
          console.log("过期了")
          // 登录
          wx.login({
            success: res => {
              console.log(res.ceode);
            //  wx.request({
            //    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3d5420e0f5ede8e1&secret=8fd1d33c1ae093b91e7014ba1872ea02&js_code='+res.code+'&grant_type=authorization_code',
            //    success:function(res){
            //     console.log(res); 
            //    }
            //  })
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
          })
        }
    })
    
    // 获取用户信息
    wx.getSetting({
      // withCredentials:true,
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res);
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  towxml: new Towxml(),
  globalData: {
    userInfo: null,
    accessToken:undefined
  }
})