
let showT = '',
    hideT = '';

function m (p,e,r) {
    if (p[e]) {
        let event  = p[e];
        p[e] = function (n) {
            r.call(this,n),event.call(this,n)
        }
    }
}

function n (n) {
    this.app = n
    console.log(this,'this.app')
}
// subscribe start
let subscrilbers = {};
n.prototype.event = function () {
    let event = {
         subscrilbe: function (fn,type) {
            if (!subscrilbers[type]) {
                subscrilbers[type] = []
            }
            subscrilbers[type].push(fn)
         },
         unsubscrilbe: function (fn,type) {
            let newsubscribers = []
            subscrilbers[type] && subscrilbers[type].forEach(item=>{
                if (item != fn) {
                    newsubscribers.push(item)
                }
            })
            subscrilbers[type] = newsubscribers
            return newsubscribers;
         },
         publish: function (args,type) {
            subscrilbers[type] && subscrilbers[type].forEach(item=>{
                item(args)
            })
        }
    }

    return event
}
// subscribe end

function y (z) {
    this.Event = new n(this);
    console.log(n,'我是在执行了lanuch',this)
}

function s (p){
    showT = Date.now();
    console.log('promise--我在load执行',this.route,'我是p',p)
}

function h (p) {
    hideT = Date.now();
    let t = hideT - showT;
    console.log(t,'我是结束的时间')
}

(function (){
    let app = App;
    let page = Page;
    let ev = '';
    App = function (r) {
        m(r,'onLaunch',y)
        app(r)
    }
    Page = function (pn) {
        m(pn,'onShow',s),m(pn,'onHide',h),m(pn,'onUnload',h);
        page(pn)

    }
})()
