
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
        this.store.dispatch=function(args){
            return new Promise((resolve,reject)=>{
                let {module,actions} = args;
                dispatch(actions);
                that.store.state[module] =  that.store.getState()[module]
                resolve(that.store.state);
            })
        }
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
    refresh (key) {
        let store = this.store;
        let data  = Object.assign({},store.getState()[that.module][key]);
        this.setData(data);
    }
}
