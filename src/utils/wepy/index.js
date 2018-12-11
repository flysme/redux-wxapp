import _util2 from './utils';
import _event2 from './utils';

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};


var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);

        }
    }
    return function(Constructor, protoProps, staticProps) {

        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);

        return Constructor;
    };

} ();

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

 /* 合并方法和属性 start*/
 function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
 /* 合并方法和属性 end*/

/*keyCheck  start*/ 
function keyCheck(vm, k) {
    if (typeof vm[k] === 'function') {
        console.warn('You are not allowed to define a function "' + k + '" in data.');
        return 0;
    } else if (['data', 'props', 'methods', 'events', 'mixins'].indexOf(k) !== -1) {
        console.warn('"' + k + '" is reserved word, please fix it.');
        return 0;
    } else if (k[0] === '$') {
        console.warn('"' + k + ': You can not define a property started with "$"');
        return 0;
    }
    return 1;
}

/*keyCheck  end*/ 


var __class = function () {
    function _wrapclass() {

        this.$com = {};
        this.$events = {};
        this.$mixins = [];
        this.$isComponent = true;
        this.$prefix = '';
        this.$mappingProps = {};
        this.data = {};
        this.methods = {};
    }

    _createClass(_wrapclass, [{
        key: '$init',
        value: function $init($wxpage, $root, $parent) {
            var _this2 = this;
            var self = this;

            this.$wxpage = $wxpage;
            if (this.$isComponent) {
                this.$root = $root || this.$root;
                this.$parent = $parent || this.$parent;
                this.$wxapp = this.$root.$parent.$wxapp;
            }

            if (this.props) {
                this.props = Props.build(this.props);
            }

            var k = void 0,
                defaultData = {};

            var props = this.props;
            var key = void 0,
                val = void 0,
                binded = void 0;
            var inRepeat = false,
                repeatKey = void 0;

            if (this.$initData === undefined) {
                this.$initData = _util2.$copy(this.data, true);
            } else {
                this.data = _util2.$copy(this.$initData, true);
            }

            if (this.$props) {
                for (key in this.$props) {
                    for (binded in this.$props[key]) {
                        if (/\.sync$/.test(binded)) {
                            if (!this.$mappingProps[this.$props[key][binded]]) this.$mappingProps[this.$props[key][binded]] = {};
                            this.$mappingProps[this.$props[key][binded]][key] = binded.substring(7, binded.length - 5);
                        }
                    }
                }
            }

            if (props) {
                for (key in props) {
                    if (keyCheck(this, key)) {
                        val = undefined;
                        if ($parent && $parent.$props && $parent.$props[this.$name]) {
                            val = $parent.$props[this.$name][key];
                            binded = $parent.$props[this.$name]['v-bind:' + key + '.once'] || $parent.$props[this.$name]['v-bind:' + key + '.sync'];
                            if (binded) {
                                if ((typeof binded === 'undefined' ? 'undefined' : _typeof(binded)) === 'object') {
                                    (function () {
                                        props[key].repeat = binded.for;
                                        props[key].item = binded.item;
                                        props[key].index = binded.index;
                                        props[key].key = binded.key;
                                        props[key].value = binded.value;

                                        inRepeat = true;

                                        var bindfor = binded.for,
                                            binddata = $parent;
                                        bindfor.split('.').forEach(function (t) {
                                            binddata = binddata ? binddata[t] : {};
                                        });
                                        if (binddata && ((typeof binddata === 'undefined' ? 'undefined' : _typeof(binddata)) === 'object' || typeof binddata === 'string')) {
                                            repeatKey = Object.keys(binddata)[0];
                                        }

                                        if (!_this2.$mappingProps[key]) _this2.$mappingProps[key] = {};
                                        _this2.$mappingProps[key]['parent'] = {
                                            mapping: binded.for,
                                            from: key
                                        };
                                    })();
                                } else {
                                    val = $parent[binded];
                                    if (props[key].twoWay) {
                                        if (!this.$mappingProps[key]) this.$mappingProps[key] = {};
                                        this.$mappingProps[key]['parent'] = binded;
                                    }
                                }
                            } else if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.value !== undefined) {
                                this.data[key] = val.value;
                            }
                        }
                        if (!this.data[key] && !props[key].repeat) {
                            val = Props.getValue(props, key, val, this);
                            this.data[key] = val;
                        }
                    }
                }
            }

            if (typeof this.data === 'function') {
                this.data = this.data.apply(this.data);
            }

            for (k in this.data) {
                if (keyCheck(this, k)) {
                    defaultData['' + this.$prefix + k] = this.data[k];
                    this[k] = this.data[k];
                }
            }

            this.$data = _util2.$copy(this.data, true);
            if (inRepeat && repeatKey !== undefined) this.$setIndex(repeatKey);

            if (this.computed) {
                for (k in this.computed) {
                    if (keyCheck(this, k)) {
                        var fn = this.computed[k];
                        defaultData['' + this.$prefix + k] = fn.call(this);
                        this[k] = _util2.$copy(defaultData['' + this.$prefix + k], true);
                    }
                }
            }
            this.setData(defaultData);

            var coms = Object.getOwnPropertyNames(this.$com);
            if (coms.length) {
                coms.forEach(function (name) {
                    var com = _this2.$com[name];
                    com.$init(_this2.getWxPage(), $root, _this2);
                });
            }
        }
    }, {
        key: '$onLoad',
        value: function $onLoad() {
            var _this4 = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            [].concat(this.$mixins, this).forEach(function (mix) {
                mix['onLoad'] && mix['onLoad'].apply(_this4, args);
            });

            var coms = Object.getOwnPropertyNames(this.$com);
            if (coms.length) {
                coms.forEach(function (name) {
                    var com = _this4.$com[name];
                    com.$onLoad.call(com);
                });
            }
        }
    }, {
        key: '$onUnload',
        value: function $onUnload() {
            var _this5 = this;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var coms = Object.getOwnPropertyNames(this.$com);
            if (coms.length) {
                coms.forEach(function (name) {
                    var com = _this5.$com[name];
                    com.$onUnload.call(com);
                });
            }

            [].concat(this.$mixins, this).forEach(function (mix) {
                mix['onUnload'] && mix['onUnload'].apply(_this5, args);
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {}
    }, {
        key: 'onUnload',
        value: function onUnload() {}
    }, {
        key: 'setData',
        value: function setData(k, v) {
            if (typeof k === 'string') {
                if (v) {
                    var tmp = {};
                    tmp[k] = v;
                    k = tmp;
                } else {
                    var _tmp = {};
                    _tmp[k] = this.data['' + k];
                    k = _tmp;
                }
                return this.$wxpage.setData(k);
            }
            var t = null,
                reg = new RegExp('^' + this.$prefix.replace(/\$/g, '\\$'), 'ig');

            for (t in k) {
                var noPrefix = t.replace(reg, '');
                this.$data[noPrefix] = _util2.$copy(k[t], true);

                if (_util2.isImmutable(k[t])) {
                    
                    k[t] = k[t].toJS();
                }

                if (k[t] === undefined) {
                    delete k[t];
                }
            }

            if (typeof v === 'function') {
                return this.$root.$wxpage.setData(k, v);
            }
            return this.$root.$wxpage.setData(k);
        }
    }, {
        key: 'getWxPage',
        value: function getWxPage() {
            return this.$wxpage;
        }
    }, {
        key: 'getCurrentPages',
        value: function (_getCurrentPages) {
            function getCurrentPages() {
                return _getCurrentPages.apply(this, arguments);
            }

            getCurrentPages.toString = function () {
                return _getCurrentPages.toString();
            };

            return getCurrentPages;
        }(function () {
            return getCurrentPages();
        })
    }, {
        key: '$setIndex',
        value: function $setIndex(index) {
            var _this6 = this;

            this.$index = index;

            var props = this.props,
                $parent = this.$parent;
            var key = void 0,
                val = void 0,
                binded = void 0;
            if (props) {
                for (key in props) {
                    val = undefined;
                    if ($parent && $parent.$props && $parent.$props[this.$name]) {
                        val = $parent.$props[this.$name][key];
                        binded = $parent.$props[this.$name]['v-bind:' + key + '.once'] || $parent.$props[this.$name]['v-bind:' + key + '.sync'];
                        if (binded) {
                            if ((typeof binded === 'undefined' ? 'undefined' : _typeof(binded)) === 'object') {
                                (function () {
                                    var bindfor = binded.for,
                                        binddata = $parent;

                                    if (bindfor.indexOf('[') === 0) {
                                        var bdarr = [];
                                        bindfor = bindfor.substr(1, bindfor.length - 2).trim();

                                        bindfor.split(',').forEach(function (e) {
                                            var bd = $parent;
                                            e.trim().split('.').forEach(function (t) {
                                                bd = bd ? bd[t] : {};
                                            });
                                            bdarr.push(bd);
                                        });

                                        binddata = bdarr;
                                    } else {
                                        bindfor.split('.').forEach(function (t) {
                                            binddata = binddata ? binddata[t] : {};
                                        });
                                    }

                                    index = Array.isArray(binddata) ? +index : index;

                                    if (props[key].value === props[key].item) {
                                        val = binddata[index];
                                    } else if (props[key].value === props[key].index) {
                                        val = index;
                                    } else if (props[key].value === props[key].key) {
                                        val = index;
                                    } else {
                                        val = $parent[props[key].value];
                                    }
                                    _this6.$index = index;
                                    _this6.data[key] = val;
                                    _this6[key] = val;
                                    _this6.$data[key] = _util2.$copy(_this6[key], true);
                                })();
                            }
                        }
                    }
                }

                for (key in this.$com) {
                    this.$com[key].$index = undefined;
                }
            }
        }
    }, {
        key: '$off',
        value: function $off(evtName, fn) {
            var _this10 = this;

            if (evtName === undefined) {
                this.$events = {};
            } else if (typeof evtName === 'string') {
                if (fn) {
                    var fns = this.$events[evtName];
                    var i = fns.length;
                    while (i--) {
                        if (fn === fns[i] || fn === fns[i].fn) {
                            fns.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    this.$events[evtName] = [];
                }
            } else if (Array.isArray(evtName)) {
                evtName.forEach(function (k) {
                    _this10.$off(k, fn);
                });
            }
            return this;
        }
    }, {
        key: '$apply',
        value: function $apply(fn) {
            if (typeof fn === 'function') {
                fn.call(this);
                this.$apply();
            } else {
                if (this.$$phase) {
                    this.$$phase = '$apply';
                } else {
                    this.$digest();
                }
            }
        }
    }, {
        key: '$digest',
        value: function $digest() {
            var _this11 = this;

            var k = void 0;
            var originData = this.$data;
            console.log(originData, 'this.$data', _util2, '_util2', this.$prefix, '$prefix')
            this.$$phase = '$digest';
            this.$$dc = 0;
            while (this.$$phase) {
                this.$$dc++;
                if (this.$$dc >= 3) {
                    throw new Error('Can not call $apply in $apply process');
                }
                var readyToSet = {};
                if (this.computed) {
                    for (k in this.computed) {
                        var _fn2 = this.computed[k],
                            val = _fn2.call(this);
                        if (!_util2.$isEqual(this[k], val)) {
                            readyToSet[this.$prefix + k] = val;
                            this[k] = _util2.$copy(val, true);
                        }
                    }
                }
                for (k in originData) {
                    if (!_util2.$isEqual(this[k], originData[k])) {
                        if (this.watch) {
                            if (this.watch[k]) {
                                if (typeof this.watch[k] === 'function') {
                                    this.watch[k].call(this, this[k], originData[k]);
                                } else if (typeof this.watch[k] === 'string' && typeof this.methods[k] === 'function') {
                                    this.methods[k].call(this, this[k], originData[k]);
                                }
                            }
                        }
                        console.log(readyToSet,'readyToSet',this)
                        readyToSet[this.$prefix + k] = this[k];
                        this.data[k] = this[k];
                        originData[k] = _util2.$copy(this[k], true);
                        if (this.$repeat && this.$repeat[k]) {
                            var $repeat = this.$repeat[k];
                            this.$com[$repeat.com].data[$repeat.props] = this[k];
                            this.$com[$repeat.com].$setIndex(0);
                            this.$com[$repeat.com].$apply();
                        }
                        if (this.$mappingProps[k]) {
                            Object.keys(this.$mappingProps[k]).forEach(function (changed) {
                                var mapping = _this11.$mappingProps[k][changed];
                                if ((typeof mapping === 'undefined' ? 'undefined' : _typeof(mapping)) === 'object') {
                                    _this11.$parent.$apply();
                                } else if (changed === 'parent' && !_util2.$isEqual(_this11.$parent.$data[mapping], _this11[k])) {
                                    _this11.$parent[mapping] = _this11[k];
                                    _this11.$parent.data[mapping] = _this11[k];
                                    _this11.$parent.$apply();
                                } else if (changed !== 'parent' && !_util2.$isEqual(_this11.$com[changed].$data[mapping], _this11[k])) {
                                    _this11.$com[changed][mapping] = _this11[k];
                                    _this11.$com[changed].data[mapping] = _this11[k];
                                    _this11.$com[changed].$apply();
                                }
                            });
                        }
                    }
                }
                if (Object.keys(readyToSet).length) {
                    this.setData(readyToSet, function () {
                        if (_this11.$$nextTick) {
                            var $$nextTick = _this11.$$nextTick;
                            _this11.$$nextTick = null;
                            if ($$nextTick.promise) {
                                $$nextTick();
                            } else {
                                $$nextTick.call(_this11);
                            }
                        }
                    });
                } else {
                    if (this.$$nextTick) {
                        var $$nextTick = this.$$nextTick;
                        this.$$nextTick = null;
                        if ($$nextTick.promise) {
                            $$nextTick();
                        } else {
                            $$nextTick.call(this);
                        }
                    }
                }
                this.$$phase = this.$$phase === '$apply' ? '$digest' : false;
            }
        }
    }, {
        key: '$nextTick',
        value: function $nextTick(fn) {
            var _this12 = this;

            if (typeof fn === 'undefined') {
                return new Promise(function (resolve, reject) {
                    _this12.$$nextTick = function () {
                        resolve();
                    };
                    _this12.$$nextTick.promise = true;
                });
            }
            this.$$nextTick = fn;
        }
    }]);

    return _wrapclass;
}();  

let _component = __class; // 输入components 属性方法





/* page class  */ 
let page_class = function (_component) {
    
    function wepy_class() {
        var _ref;
        var _temp, _this, _ret;
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = wepy_class.__proto__ || Object.getPrototypeOf(wepy_class)).call.apply(_ref, [this].concat(args))), _this), _this.$isComponent = false, _this.$preloadData = undefined, _this.$prefetchData = undefined, _temp), _possibleConstructorReturn(_this, _ret)
    }
    _inherits(wepy_class, _component);  //合并方法属性
    
    _createClass(wepy_class, [{
        key: '$init',  //初始化方法
        value: function $init(wxpage, $parent) {

            this.$parent = $parent;
            this.$root = this;
            if (!$parent.$wxapp) {
                $parent.$wxapp = getApp();
            }
            this.$wxapp = $parent.$wxapp;
            _get(wepy_class.prototype.__proto__ || Object.getPrototypeOf(wepy_class.prototype), '$init', this).call(this, wxpage, this);
        }
        }, {
            key: 'onLoad',
            value: function onLoad() {
                console.log(wepy_class.prototype,'wepy_class.prototype')
                _get(wepy_class.prototype.__proto__ || Object.getPrototypeOf(wepy_class.prototype), 'onLoad', this).call(this);
            }
        }, {
            key: 'onUnload',
            value: function onUnload() {
                _get(wepy_class.prototype.__proto__ || Object.getPrototypeOf(wepy_class.prototype), 'onUnload', this).call(this);
            }
        }, {
            key: '$preload',
            value: function $preload(key, data) {
                if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
                    var k = void 0;
                    for (k in key) {
                        this.$preload(k, key[k]);
                    }
                } else {
                    (this.$preloadData ? this.$preloadData : this.$preloadData = {})[key] = data;
                }
            }
        }
    ]);
    return wepy_class;
}(_component)


export default page_class;