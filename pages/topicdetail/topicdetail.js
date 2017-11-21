// pages/topicdetail/topicdetail.js
const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    replies: [],
    isLogin: false,
    isLoading:false,
    is_collect:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const accessT = wx.getStorageSync('accessToken');
    var that = this;
    that.setData({
      topic_id:options.id
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: util.apiurl() + '/topic/' + options.id,
      data: {
        mdrender: false,
        accesstoken: accessT
      },
      success: res => {
        const topic = res.data.data;
        console.log(topic)
        let data = app.towxml.toJson(topic.content, 'markdown');
        //设置文档显示主题，默认'light'
        data.theme = 'light';
        topic.replies.forEach(function (ele) {
          ele.content = app.towxml.toJson(ele.content, 'markdown');
          ele.create_at = util.formatTimeAgo(topic.create_at);
          ele.last_reply_at = util.formatTimeAgo(topic.last_reply_at);
          // ele.content.theme = 'dark'
        })
        //设置数据
        that.setData({
          topic: this.formatTimeAgo(topic),
          content: data,
          replies: topic.replies,
          isLoading:true,
          is_collect:topic.is_collect
        });
        wx.setNavigationBarTitle({
          title: that.data.topic.title,
        })
        wx.hideLoading();
      }
    })
    //
    console.log(options.id);
  },
  getTag: function (tabname) {
    var tag = '';
    if (tabname == 'share') tag = '分享';
    if (tabname == 'ask') tag = '问答';
    if (tabname == 'job') tag = '招聘';
    return tag;
  },
  formatTimeAgo: function (topic) {
    topic.tab = this.getTag(topic.tab);
    topic.create_at = util.formatTimeAgo(topic.create_at);
    topic.last_reply_at = util.formatTimeAgo(topic.last_reply_at);
    return topic;
  },
  onTapStar: function (e) {
    const accesstoken = wx.getStorageSync('accessToken');
    var that = this;
    if (that.data.is_collect){
      if (accesstoken) {
        wx.request({
          url: util.apiurl() + '/topic_collect/de_collect',
          method: 'POST',
          data: {
            accesstoken: accesstoken,
            topic_id: that.data.topic_id
          },
          success: function (res) {
            wx.showToast({
              title: '取消收藏成功',
              icon: 'success'
            })
            that.setData({
              is_collect: false
            })
          }
        })
      }
    }else{
      if (accesstoken) {
        wx.request({
          url: util.apiurl() + '/topic_collect/collect',
          method: 'POST',
          data: {
            accesstoken: accesstoken,
            topic_id: that.data.topic_id
          },
          success: function (res) {
            wx.showToast({
              title: '收藏成功',
              icon: 'success'
            })
            that.setData({
              is_collect: true
            })
          }
        })
      }
    }
    
    

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})