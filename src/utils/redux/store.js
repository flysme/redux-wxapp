
import rootReducer from 'reducers/index'
import { createStore,applyMiddleware,compose } from './redux';
import thunkMiddleware from './redux-thunk';
import loggerMiddleware from './redux-logger';
console.log(rootReducer,'rootReducer')
class Getstore {
    static initStroe () {
        return  createStore(rootReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ));
    }
}

const store =  Object.assign({},Getstore.initStroe(),{state: {}});

export default class Store {
    constructor () {
        this.setProtosToThis();
        let dispatch = store.dispatch;
        let that = this;
        this.store = store;
        // this.store.dispatch=(args)=>{
        //     return new Promise((resolve,reject)=>{
        //         let {module,actions} = args;
        //         dispatch(actions);
        //         this.store.state[module] =  this.store.getState()[module];
        //         resolve(that.store.state);
        //     })
        // }
    }
    setProtosToThis() {
        let properties = Object.getOwnPropertyNames(this.__proto__);
        let propertiesProto = Object.getOwnPropertyNames(this.__proto__.__proto__)
        properties.push(...propertiesProto)
        for (let i in properties) {
            let name = properties[i]
            if (name === 'constructor') {
                continue
            }
            this[name] = this[name]
        }
        console.log(this,'properties')
    }
    connect (data,that) {
        this.store.subscribe(() => {
            let refreshMainData = {};
            let state = this.store.getState();
            console.log(state,'state')
            for (let fnkey in data) {
                let refreshData = (typeof data[fnkey]=='function')&&data[fnkey](state);
                Object.assign(refreshMainData,{[fnkey]:refreshData})
            }
            // refreshMainData && that.setData(refreshMainData);
         })
    }
}
