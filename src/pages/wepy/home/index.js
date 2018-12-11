// pages/wepy/home/index.js


import CreatePage from '../../../utils/wepy/Page' ;
import connect from '../../../utils/wepy/redux/connect';


var a =0;
class Home {
  data={
    count:0,
    time: +new Date()
  }
  computed = {
    now () {
      return +new Date()
    }
  }
  onLoad(){
    console.log('Home--onLoad')
  }
  methods = {
    setnum () {
      this.count = a++
    }
  }
}


CreatePage(connect({
  setnum:function(state){
    return state
  }
}),Home)
