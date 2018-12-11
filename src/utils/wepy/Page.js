// pages/wepy/Page.js

import Wepy_page from './index' ;

import BASE from './base';


var _dec, _class, _addarr = []; // alias example

/*_inherits*/ 
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  console.log(superClass.prototype,'superClass',superClass)
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
/*_inherits*/ 

/*_createClass*/ 
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
  console.log(Constructor,'Constructor')
}();
/*_createClass*/ 


/*_possibleConstructorReturn*/ 
function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
/*_possibleConstructorReturn*/ 

/*_classCallCheck*/ 
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

/*_initPage*/ 
function _initPage (Page) {
    let page = new Page();
    let PAGE_PER_EVENT = ['onLoad','onUnload'];
    let objPropsNames = Object.getOwnPropertyNames(page);
    let objPropprotosNames = Object.getOwnPropertyNames(page.__proto__);
    objPropsNames.push(...objPropprotosNames);

    PAGE_PER_EVENT.forEach((key,i) => {
        let idx = objPropsNames.indexOf(key);
         idx > -1 && _addarr.push({
            key: key,
            value: page.__proto__[objPropsNames[idx]] || page[idx]
        })
    })
    return function Fn() {
        for (var i = 0,len = objPropsNames.length;i<len;i++){
            if (objPropsNames[i]=='constructor' || PAGE_PER_EVENT.indexOf(objPropsNames[i]) > -1) {
                continue;
            }
            this[objPropsNames[i]] = page[objPropsNames[i]]
        }
    }
  }


export default function CreatePage (connect,page) {
    if (typeof connect !='function' || typeof page !=='function') {
        throw new TypeError("connect or page expression must either be  a function, not ");
    }
    var _page = _initPage(page); 
    /*_classCallCheck*/ 
    var Index = (_dec = connect, _dec( _class = function (_wepy$page) {
        _inherits(Index, _wepy$page);
    
        function Index() {
            var _ref;
        
            var _temp, _this, _ret;
        
            _classCallCheck(this, Index);
        
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            _this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args)));   
            _temp = _page.call(_this,Index);
            _ret = _possibleConstructorReturn(_this, _ret);
            return _ret;
            // return _ret = ( _temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this),_page.call(_this,Index), _temp), _possibleConstructorReturn(_this, _ret);
        }
        _addarr.length && _createClass(Index,_addarr)
        console.log(Index.prototype,'Index.prototypeIndex.prototype')
        return Index;

    }(Wepy_page) ) || _class);

  Page(BASE.$createPage(Index));

}


