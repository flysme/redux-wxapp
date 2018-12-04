class Singleton {
  constructor () {}
  submit () { return {} }
}

Singleton.getsingle = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new Singleton
    }
    return instance
  }
})()
let f = Singleton.getsingle()
console.log('f', f)