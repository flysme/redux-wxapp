// pages/preLoadpage/index.js
import Preload from '../../libs/preLoad';


class PreLoadpage extends Preload{

      /**
       * 页面的初始数据
       */
      data= {
          name:''
      }
      constructor (...args) {
          super(...args);
            super.$init({
                arr: []
            });
      }
      /**
       * 生命周期函数--监听页面加载
       */
       onLoad(options) {
        super.onLoad(options);
        console.log('-------此时刚刚执行第二个页面的onLoad方法--------',options);
        const lightningData = this.$take('second-data');
        if (lightningData) {
            lightningData.then((data) => {
                this.$setData(data);
                console.log('闪电加载更新界面', data);
            });
            return;
        }
        this.initData(options);
    }

      $onNavigator= (query)=> {
          this.$put('second-data', this.initData.bind(this), query);
          console.log('query',query)
      }
      initData = function (query, resolve, reject) {
         console.log('initData----query',query)
        setTimeout(() => {
            if (typeof query.count === "string") {
                query.count = parseInt(query.count);
            }

            this.$resolve(this.data);//或者 resolve(this.data);
        }, 11300);
    };
}
let page = new PreLoadpage({clazzName: 'preLoadpage'})
Page(page)
