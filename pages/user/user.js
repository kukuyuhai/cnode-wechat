// pages/user/user.js
const util = require("../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    userinfo:{},
    recent_replies:[],
    recent_topics:[]
  },

  /**
   * form submit提交
   */
  onLoginSubmit:function(e){
    const accesstoken = e.detail.value.accesstoken;
    var that = this;
    wx.request({
      url: util.apiurl() + "/accesstoken",
      data: {
        accesstoken: accesstoken
      },
      method: 'POST',
      success: function (res) {
        if (res.data.success) {
          // app.globalData.accessToken = accesstoken
          wx.setStorageSync('accessToken', accesstoken);
          wx.setStorageSync('loginname', res.data.loginname);
          util.loginRequest(res.data.loginname, function (res) {
            that.setData({
              isLogin: !that.data.isLogin,
              userinfo: {
                loginname: res.data.data.loginname,
                avatar_url: res.data.data.avatar_url,
                score: res.data.data.score
              },
              recent_replies: res.data.data.recent_replies,
              recent_topics: res.data.data.recent_topics
            })
          })
        }else{
          wx.showModal({
            title: '登录失败',
            content: '检查AccessToken或者二维码错误',
            showCancel:false
          })
        }
      }
    })
  },

  /**
   * 绑定扫一扫时间实现登录
   *
   */
  onTapToScan:function (){
    wx.scanCode({
      success: (res) => {
        // app.globalData.accessToken = res.result;
        // console.log(app.globalData.accessToken)
        wx.setStorageSync('accessToken', res.result);
        var that = this;
        wx.request({
          url: util.apiurl() + "/accesstoken",
          data: { 
            accesstoken:res.result
          },
          method:'POST',
          success:function(res){
            if(res.data.success){
              wx.setStorageSync('loginname', res.data.loginname);
              util.loginRequest(res.data.loginname,function(res){
                that.setData({
                  isLogin: true,
                  userinfo: {
                    loginname: res.data.data.loginname,
                    avatar_url: res.data.data.avatar_url,
                    score: res.data.data.score
                  },
                  recent_replies: res.data.data.recent_replies,
                  recent_topics: res.data.data.recent_topics
                })
              })
            }else{
              wx.showModal({
                title: '登录失败',
                content: '检查AccessToken或者二维码错误',
                showCancel: false
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var username = wx.getStorageSync('loginname');
      var accessToken = wx.getStorageSync('accessToken');
      if (username) {
        var that = this;
        util.loginRequest(username, function (res) {
          that.setData({
            isLogin: true,
            userinfo: {
              loginname: res.data.data.loginname,
              avatar_url: res.data.data.avatar_url,
              score: res.data.data.score,
            },
            recent_replies: res.data.data.recent_replies,
            recent_topics: res.data.data.recent_topics
          })
        })
      }

    } catch (e) {
      console.log(e)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})