//app.js
// const ald = require('./utils/sdk/ald-stat.js')
// const util = require('./utils/util.js')
var time = Date.now();
/**
 * 1. 引入store
 */
// const Store = require('./libs/store.js');
/**
 * 2. 实例化一个Store，且允许初始化一个全局状态
 */
// let store = new Store({
//   state: {
//     //以下为自定义的全局状态，用法和页面中的data: {...} 一致。
//     msg: 'Mini Store 是一个基于微信小程序的全局状态库。\n能够在Page，Component，template中任意wxml文件内使用全局状态。\n且全局的状态完全同步。',
//     user: {
//       name: '李四',
//       time: new Date()
//     }
//   },
//   methods: {
//     goAnyWhere(e) {
//       wx.navigateTo({
//         url: e.currentTarget.dataset.url
//       })
//     },
//     onLoad(){
//       console.log(12323232)
//     }
//   },
//   pageLisener: {
//     onLoad(options){
//       console.log('我在' + this.route, '参数为', options);
//     }
//   }
// })

App({
  onLaunch: function () {
    console.log('onLaunch------是否')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    setTimeout(()=>{
      if (this.callback) {
        this.callback({name: '我是name'})
      }
    },3000)
  },
  /**
   * 3.Introduction to app
   */
  // store: store,
  globalData: {
    userInfo: null
  },
  onShow: function () {
    // this.aldstat.sendEvent('小程序启动花费时间', {
    //   "花费时长": Date.now() - time
    // })
  }
})
