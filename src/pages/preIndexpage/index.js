// pages/preIndexpage/index.js'
// const preLoad = require('./libs/preLoad')
import Preload from '../../libs/preLoad';
console.log('Preload',Preload)

class PreIndexpage extends Preload{

      /**
       * 页面的初始数据
       */
      data= {

      }
      constructor (...args) {
          super(...args);
      }
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad (options) {
          console.log(this,'onLoad')
      }
      load = function() {
          // this.$route({path: '../preLoadpage/index', query: {count: 10, title: '这是第二个页面'}, clazzName: 'preLoadpage'});
          let arr = [
              {count:0},
              {count:0},
              {count:0},
              {count:0}
          ];
          let newarr = arr.map(item=>++item.count)
          console.log('newarr',newarr)
      }

}
let page = new PreIndexpage()
console.log(page,'page')
Page(page)
