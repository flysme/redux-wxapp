/**
 * @author 逍遥
 * @update 2018.10.30
 * @version 1.1
 */
const pageLife = ['data', 'onLoad', 'onShow', 'onReady', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap']
let event = null;
/**
 * Store的构造函数
 * @param {json} options 所有状态
 * @return 用new关键字初始化，可获得一个全局状态
 */
function Store(options = {}) {
  //所有页面及组件
  this.$r = [];
  //状态库
  options.state || (options.state = {});
  this.$state = {
    ...options.state
  }
  const [_this, OriginCom, OriginPage] = [this, Component, Page];
  const behavior = options.behavior;
  const methods = options.methods;
  const pageLisener = options.pageLisener;
  //重构Component
  Component = function(arg = {}) {
    let attached = arg.attached;
    //behavior 注入
    if (behavior) {
      if (arg.behaviors) {
        arg.behaviors = [behavior, ...arg.behaviors];
      } else {
        arg.behaviors = [behavior];
      }
    }
    // 全局方法注入
    if (typeof methods === 'object'){
      if (typeof arg.methods === 'object'){
        arg.methods = {
          ...methods,
          ...arg.methods
        }
      }else{
        arg.methods = {
          ...methods
        }
      }
    }
    arg.data = {
      ...arg.data,
      $state: _this.$state
    }
    arg.attached = function() {
      _this.$r.push(this);
      if (event) {
        event();
        event = null;
      } else {
        this.setData({
          ['$state']: { ..._this.$state
          }
        })
      }
      attached && attached.call(this, ...arguments);
    }
    let detached = arg.detached;
    arg.detached = function() {
      _this.$r.splice(_this.$r.findIndex(item => item === this), 1);
      detached && detached.call(this, ...arguments);
    }
    OriginCom(arg)
  };

  //重构Page
  Page = function(arg = {}) {
    if (typeof methods === 'object'){
      for (let key in methods) {
        if (!pageLife.some(item => item === key)){
          arg[key] = methods[key]
        }
      }
    }
    if (typeof pageLisener === 'object'){
      for (let key in pageLisener) {
        if (pageLife.some(item => item === key) && typeof pageLisener[key] === 'function') {
          let originLife = arg[key];
          arg[key] = function(){
            pageLisener[key].call(this, ...arguments);
            originLife && originLife.call(this, ...arguments);
          }
        }
      }
    }
    arg.data = {
      ...arg.data,
      $state: _this.$state
    }
    let onLoad = arg.onLoad;
    arg.onLoad = function() {
      _this.$r.push(this);
      console.log('_this.$r',_this.$r,'_this.$state',_this.$state)
      if (event) {
        event();
        event = null;
      } else {
        this.setData({
          ['$state']: { ..._this.$state}
        })
      }
      onLoad && onLoad.call(this, ...arguments);
    }
    let onUnload = arg.onUnload;
    arg.onUnload = function() {
      _this.$r.splice(_this.$r.findIndex(item => item === this), 1);
      onUnload && onUnload.call(this, ...arguments);
    }
    OriginPage(arg)
  };
}

/**
 * 用于同步更新全局状态
 * @param {json} arg 初始化节点
 * @param {function} callback 更新后的回调，可获取Dom
 * @return 无返回值
 */
Store.prototype.setState = function(arg, callback) {
  if (typeof arg != 'object' && arg !== null) {
    throw new Error('第一个参数必须为object对象')
  }
  let _this = this,
    pros = [],
    obj = {};
  //组装将要更新的obj
  for (let key in arg) {
    obj['$state.' + key] = arg[key];
  }
  console.log('obj',obj)
  const hanlder = function() {
    // 倒着更新。后进先出
    for (let i = _this.$r.length - 1; i >= 0; i--) {
      let item = _this.$r[i];
      let p = new Promise(resolve => {
        item.setData({
          ...obj
        }, resolve)
      });
      pros.push(p);
    }
    Promise.all(pros).then(_ => {
      typeof callback === 'function' && callback();
    })
    _this.$r[0] && (_this.$state = { ..._this.$r[0].data.$state
    })
  }
  if (_this.$r.length > 0) {
    hanlder();
  } else {
    event = function() {
      hanlder();
    }
  }
}
Store.version = 1.1
module.exports = Store
