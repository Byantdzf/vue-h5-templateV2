import wx from 'weixin-js-sdk'
import service from '@/utils/request'

const base = {}
base.install = function(Vue, options) {
  Vue.prototype.$shareList = function(imgUrl, link, desc, title) { // 分享
    const url = encodeURIComponent(location.href.split('#')[0])
    const parameter = { url: url }
    service.post(`/official/js/config`, parameter).then(data => {
      wxInit(data, imgUrl, link, desc, title)
      // localStorage.setItem('wxConfig', JSON.stringify(data))
    }).catch((error) => {
      console.log(error)
    })
  }
}

function wxInit(res, imgUrl, link, desc, title) {
  wx.config(res)
  wx.ready(function() {
    wx.updateAppMessageShareData({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function() {
        console.log('分享成功')
      },
      cancel: function() {
        console.log('分享失败')
      }
    })
    // 微信分享菜单测试
    wx.updateTimelineShareData({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function() {
        console.log('分享成功')
      },
      cancel: function() {
        console.log('分享失败')
      }
    })
  })
  wx.error(function(err) {
    alert(JSON.stringify(err))
  })
}

export default base
