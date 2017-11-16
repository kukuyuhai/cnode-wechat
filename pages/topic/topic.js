const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winWidth: '',
    winHeight: '',
    isLoading: true,
    topics: [],
    scrollTop: 0,
    page_index: 1,
  },

  bindTabChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    this.getTopics();
  },

  bindSwitchTab: function (e) {
    var that = this;
    if (this.data.currentTab != e.target.dataset.current) {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        //console.log(res);
        that.setData({
          winWidth: res.windowHeight,
          winHeight: res.windowHeight
        });
      }
    });
    this.getTopics();
  },
  getTabName: function () {
    var currentId = this.data.currentTab;
    var tab = '';
    if (currentId == 0) tab = 'all';
    if (currentId == 1) tab = 'share';
    if (currentId == 2) tab = 'ask';
    if (currentId == 3) tab = 'job';
    return tab;
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
  getTopics: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: util.apiurl() + '/topics',
      data: {
        tab: that.getTabName(),
        limit: 20,
        page: 1
      },
      success: function (res) {
        const json = res.data;
        console.log(res);
        if (json.success) {
          that.setData({
            topics: that.formatTime(json.data),
            scrollTop: 0,
            page_index: 1
          })
          wx.hideLoading();
        }
      }
    })
  },
  /**
   *  上拉加载数据
   */
  lower: function () {
    if (this.data.isLoading) {
      var that = this;
      var pageo = that.data.page_index++;
      that.setData({
        isLoading: false
      })
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: util.apiurl() + '/topics',
        data: {
          tab: that.getTabName(),
          limit: 20,
          page: pageo
        },
        success: function (res) {
          const json = res.data;
          if (json.success) {
            that.setData({
              topics: that.data.topics.concat(that.formatTime(json.data)),
              page: pageo,
              isLoading: true
            })
            wx.hideLoading();
          }
        }
      })
    }

  }
})