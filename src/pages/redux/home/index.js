// pages/redux/home/index.js
import Store from '../../../utils/redux/store.js'
import  * as TODOS from '../../../utils/redux/actions/addtodo'
class Home extends Store {
      data= {

      }
      onShow (options) {
          this.init();

      }
      init(){
          let that = this;
          let store = this.store;
          // store.subscribe(() => {
          //     console.log('getState',this.store)
          // })
         this.connect({
             iswaiting (state) {
                 return state.HOME.iswaiting
             }
         },this)
          store.dispatch(TODOS.waiting())

          // store.dispatch(TODOS.async()).then(_=>{
          //     console.log(store.getState(),'res')
          // })


         // this.data.timer = setInterval(_ => {
         //     store.dispatcher({
         //         module:'HOME',
         //         actions:TODOS.success()
         //     }).then(state=>{
         //         console.log(this.store.state,'store')
         //     })
         // }, 2000)



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
