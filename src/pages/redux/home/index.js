// pages/redux/home/index.js
import Store from '../../../utils/redux/store.js'
import  * as TODOS from '../../../utils/redux/actions/addtodo'
class Home extends Store {
      data= {

      }
      onShow (options) {
          this.init();

      }
      init = ()=>{
          let that = this;
          let store = this.store;
          // store.subscribe(() => {
          //     console.log('getState',this.store)
          // })
         //  store.dispatcher({
         //      module:'HOME',
         //      actions:TODOS.waiting()
         //  }).then(state=>{
         //      console.log(this.store.state,'store')
         //  })
         // this.data.timer = setInterval(_ => {
         //     store.dispatcher({
         //         module:'HOME',
         //         actions:TODOS.success()
         //     }).then(state=>{
         //         console.log(this.store.state,'store')
         //     })
         // }, 2000)

         store.dispatch(TODOS.async()).then(_=>{
             console.log(store.getState(),'res')
         })

      }
      navigator=()=>{
          wx.navigateTo({
              url:'../log/index'
          })
      }
      onHide () {
          clearInterval(this.data.timer)
      }
}

const page = new Home()
Page(page)
