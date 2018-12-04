class Storages {
  constructor (entry) {
    this.setProps()
    this.x = entry || wx;
  }
  setProps () {
    let _props_ = Object.getOwnPropertyNames(this.__proto__)
    for (let i in _props_) {
      if (_props_[i] == 'constructor')continue;
      this[_props_[i]] = this[_props_[i]]
    }
  }
  __set__ (key,savedata,timeout) {
    let now = Date.now() || new Date().getTime();
    let timestamp = now + ( 1000 * 60 * 60 * 12 * (timeout || 1) )
    let data = { savedata, timestamp}
    console.log('data', data)
    wx.setStorage({ key, data})
  }
  __get__ (key) {
    let now = Date.now() || new Date().getTime();
    let storage = w.getStorage(key)
    if (!wx.getStorage({ key }))return;
    if (now > storage.timestamp) {
      this.__remove__(key)
      return;
    }
    return storage.savedata;
  }
  __remove__ (key) {
    wx.removeStorage({ key})
    return true
  }
}

module.exports = (function (Storage) {
  let storage = new Storage();
  let filterMappingProps = ['w', 'setProps','__get__'];
  let hander = {
    get(target, name) {
      for (let key of filterMappingProps) {
        if (name === key) {
          throw Error('err')
          return
        }
      }
      return Reflect.get(target,name)
    },
    set(target, name,value){

    },
    has(target, name) {
      for (let key of filterMappingProps){
        if (key in storage){
          return false
        }
      }
      return name in target
    }
  }
  return new Proxy(storage || {}, hander)
})(Storages)