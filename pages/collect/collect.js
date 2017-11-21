// pages/collect/collect.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var username = wx.getStorageSync('loginname');
    wx.request({
      url: util.apiurl() + '/topic_collect/' + username,
      success:function(res){
        that.setData({
          collect:that.formatTime(res.data.data)
        })
      }
    })
  },
  getTag: function (tabname) {
    var tag = '';
    if (tabname == 'share') tag = '分享';
    if (tabname == 'ask') tag = '问答';
    if (tabname == 'job') tag = '招聘';
    return tag;
  },
  formatTime: function (topics) {
    return topics.map(topic => {
      // Get display tag
      topic.tag = this.getTag(topic.tab);
      // Format time
      topic.create_at = util.formatTimeAgo(topic.create_at);
      topic.last_reply_at = util.formatTimeAgo(topic.last_reply_at);
      return topic
    })
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
    var that = this;
    var username = wx.getStorageSync('loginname');
    wx.request({
      url: util.apiurl() + '/topic_collect/' + username,
      success: function (res) {
        that.setData({
          collect: that.formatTime(res.data.data)
        })
      }
    })
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