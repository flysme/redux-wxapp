let storage = require('../../utils/storge')
require('../../utils/Singleton.js')

// pages/storage/index.js
Page({
  data: {

  },
  onLoad: function (options) {
    // storage.__set__('first',{name:'zfx'},2)
    storage.__set__('first', { name: 'zfx' }, 2)
    this.init()
  },
  onReady: function () {

  },
  init () {
    
  }
})