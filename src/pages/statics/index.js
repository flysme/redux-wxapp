// pages/statics/index.js
var app = getApp();
console.log('Page', Page)
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log('1')
    setTimeout(function () { console.log('我是第二个') }, 800)
    setTimeout(function(){console.log('我是第一个')},1000)
    console.log('2')
  },
  play: function () {
    app.aldstat.sendEvent('他点击了play按钮', {
      play: "这个play按钮的颜色是红色"
    })
  },
  tohome(){
    let ev = app.Event.event();
    ev.publish('我触发了event','sendfirst')
    wx.navigateTo({
      url: '../index/index',
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
    console.log('route', this.route)
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
