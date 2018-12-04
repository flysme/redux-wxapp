// pages/redux/home/index.js
import Store from '../../../utils/redux/store.js'
import { reducetodos } from '../../../utils/redux/actions/addtodo'
class Log extends  Store {
      data= {
          count: 0
      }
      onLoad (options) {
          this.init();

      }
      init = ()=> {
          let store = this.store;
          console.log('log----getState',this.store.getState())
      }
      setcount=()=>{
          let store = this.store;
          store.dispatch(reducetodos())
      }
}

const page = new Log()
Page(page)
