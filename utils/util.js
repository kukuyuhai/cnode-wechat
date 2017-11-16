import timeago from '../bower_components/timeago.js/dist/timeago.min.js'
const timeagoInstance = new timeago();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const apiurl = () => {
  return 'https://cnodejs.org/api/v1';
}

const formatTimeAgo = (time)=>{
  return timeagoInstance.format(time, 'zh_CN');
}

const loginRequest = (username, callback) => {
  wx.request({
    // + username,
    url: apiurl() + "/user/alsotang",
    success: function (res) {
      // console.log(res);
      callback(res);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  apiurl: apiurl,
  loginRequest: loginRequest,
  formatTimeAgo: formatTimeAgo
}
