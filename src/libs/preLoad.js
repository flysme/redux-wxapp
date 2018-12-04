import Navigator from "./Navigator";

export default class CommonPage {
    constructor(...args) {
        if (new.target === CommonPage) {
            throw new Error("the CommonPage class can't be instantiated!")
        }
        if (args.length) {
            const name = args[0].clazzName;
            if (name) {
                this.data = {clazzName: name};
                Navigator.putPage(name, this);
            }
        }
    }

    $init(originData) {
        Object.assign(this.data = this.data ? this.data : {}, originData);
        this.$origin = JSON.parse(JSON.stringify(this.data));
        Object.freeze(this.$origin);
    }

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    };

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    }

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    }

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    }

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        if (this.data.clazzName) {
            let clazz = Navigator.getPage(this.data.clazzName);
            if (!clazz || !clazz.$origin) {
                console.error('请先在页面的constructor方法中注入init(data)，以避免出现不必要的错误');
                return;
            }
            clazz.data = JSON.parse(JSON.stringify(clazz.$origin));
        }
    }

    $setData = function (data) {
        if (this.setData) {
            this.setData(data);
        } else {
            Object.assign(this.data = this.data ? this.data : {}, data);
        }
    };

    $route = function ({path = '', query = {}, clazzName = ''}) {
        console.log(path,'path')
        let args = '';
        if (Object.keys(query).length) {
            args = '?';
            for (let i in query) {
                if (query.hasOwnProperty(i)) {
                    args += i + '=' + query[i] + '&';
                }
            }
            args = args.substring(0, args.length - 1);
        }
        let clazz = Navigator.getPage(clazzName);
        console.log(clazz,'clazz')
        if (clazz && clazz.$onNavigator) {
            clazz.$onNavigator && clazz.$onNavigator(query);
            // setTimeout(() => {
                wx.navigateTo({url: `${path + args}`});
            // }, 150);
        } else {
            wx.navigateTo({url: `${path + args}`});
        }


    };
    $put =  (key, fun, args)=> {
        if (key && fun) {
            console.log('Promise',CommonPage._$delay(this, fun, args))
            CommonPage.prototype._pageValues[`${this.data.clazzName}?${key}`] = CommonPage._$delay(this, fun, args);
        }
    };

    $take = function (key) {
        if (key) {
            const promise = CommonPage.prototype._pageValues[`${this.data.clazzName}?${key}`];
            delete CommonPage.prototype._pageValues[`${this.data.clazzName}?${key}`];
            return promise;
        }
        return null;
    };

    static _$delay(context, cb, args) {
        return new Promise((resolve, reject) => {
            context.resolve = resolve;
            context.reject = reject;
            CommonPage.prototype.currentPageContext = context;
            cb && cb(args, resolve, reject);
        });
    }

    $resolve = function (data) {
        const context = CommonPage.prototype.currentPageContext;
        !!context && !!context.resolve && context.resolve(data);
        CommonPage.prototype.currentPageContext = null;
    };

    $reject = function (data, error) {
        const context = CommonPage.prototype.currentPageContext;
        !!context && !!context.reject && !!context.reject(data, error);
        CommonPage.prototype.currentPageContext = null;
    };
}

CommonPage.prototype._pageValues = {};
CommonPage.prototype.currentPageContext = null;

//
// import { $store } from './$store';
//
// export default class Preload  {
//     constructor () {
//         this.initProperty();
//     }
//     static store = Object.assign({},$store);
//     static subscrilbers = {};
//     initProperty () {
//         let propName = Object.getOwnPropertyNames(this.__proto__);
//         let propProtoName = Object.getOwnPropertyNames(this.__proto__.__proto__);
//         propName.push(...propProtoName);
//         for (let j = 0;j<propName.length;j++){
//             if (propName[j]!='constructor') {
//                 this[propName[j]] = this[propName[j]]
//             }
//         }
//     }
//
//
// }
