
export default function connect (states, actions) {
    states = {name(){return 'zfx11111111'}};
    actions = {};
    return function connectComponent(Component) {
        let unSubscribe = null;
        // 绑定
        const onLoad = Component.prototype.onLoad;
        const onUnload = Component.prototype.onUnload;
        console.log(onLoad,'Component.prototype1')

        const onStateChange = function () {
            console.log('onStateChange')
            // const store = getStore();
            // let hasChanged = false;
            // Object.keys(states).forEach((k) => {
            //     const newV = states[k].call(this);
            //     if (this[k] !== newV) {
            //         // 不相等
            //         this[k] = newV;
            //         hasChanged = true;
            //     }
            // });
            // hasChanged && this.$apply();
        };
        return class extends Component {
            constructor () {
                super();
                this.computed = Object.assign(this.computed || {}, states);
                this.methods = Object.assign(this.methods || {}, actions);
                console.log('tComponent', Component.prototype)

            }
            onLoad() {
                console.log('onLoad')
                // const store = getStore();
                // unSubscribe = store.subscribe(onStateChange.bind(this));
                // onStateChange.call(this);
                console.log('onLoad------onLoad', Component.prototype)
                onLoad && onLoad.apply(this, arguments);
            }
            onUnload () {
                // unSubscribe && unSubscribe();
                // unSubscribe = null;
                // onUnload && onUnload.apply(this, arguments);
            }
        };
    };
};
