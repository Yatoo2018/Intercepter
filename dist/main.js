/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Interceptor.js":
/*!****************************!*\
  !*** ./src/Interceptor.js ***!
  \****************************/
/*! exports provided: Interceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Interceptor\", function() { return Interceptor; });\n/* harmony import */ var _debug_console_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug_console.js */ \"./src/debug_console.js\");\n\n\n  /**\n   * 日志拦截处理器类\n   * 注意本功能会对原始记录进行包装，比如原始记录：{ msg: \"我是一条记录\"}\n   * 节流处理后，这条记录可能被删除，也可能输出，如果这条记录被输出将转换为 {addtime: timenumber, reporttime:timenumber, times: number, origin: {msg: \"我是一条记录\"} }\n   * @class Interceptor \n   * @description 对指定时间内的重复日志节流统计上报\n   * @params {object} option - 提供配置的对象\n   * @params {function=} option.diff - 俩条记录的判重函数\n   * @params {function=} option.report - 节流后的记录输出\n   * @params {number} [option.delay=5000] - 单位ms\n   * @author 069810\n   * @date 2019-05-23\n   * @returns null\n   */\n  function Interceptor(option){\n\n    // 对连续5000毫秒时间间隔内的请求进行节流\n    this.delay = option.delay ? option.delay : 5000;\n\n    this.dff = option.diff ? option.diff : function(o, n) { return o.msg === o.msg }\n\n    // 上报总次数\n    this.totaltimes = 0;\n\n    // 上报处理器在队列中的id\n    this.timeoutId = null;\n\n    // 上一条引用\n    this.pre = null;\n\n    // 重复开始时间, 第一次重复的时候记录\n    this.repeattime = null;\n    this.repeat  = false;\n\n    /**\n     * @description 添加记录函数\n     * @params {object} item - 日志记录对象\n     * @returns this - 方便链式调用方法\n     */\n    this.add = function add(item) {\n\n      Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])('添加记录', item);\n\n      var ths = this, now = Date.now();\n\n      item = {addtime:null, times: 0, reporttime: null, origin: item}\n      item.addtime = now;\n      item.times = 1;\n      // 是否第一次请求\n      if(this.pre) {\n        // 非第一次请求\n\n        Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])('非第一次请求', item, \"记录添加时间差\", item.addtime - this.pre.addtime)\n\n        // 俩次请求的添加时间超过延时间隔了，上一条日志已经上报完成了，对新的请求重新记录\n        if(item.addtime - this.pre.addtime >= this.delay)\n        {\n\n          Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"俩次添加时间间隔超出延时间隔，上条日志已经上报，添加新的记录到队列\")\n          this.repeat = false\n          this.pre = item;\n          this.timeoutId = setTimeout(function timeoutHandler(o) {\n            o.reporttime = Date.now();\n            ths.report(o)\n            Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"添加间隔超出延时间隔上报\",o)\n          }, this.delay, item)\n        }\n        else\n        { // 倒计时时间内收到新的请求,且重复时间不超过延时间隔\n\n          Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"倒计时时间内再次收到请求，对请求进行判重\")\n\n          // 对本请求和上一条请求进行判重\n          if(option.diff(this.pre.origin,item.origin))\n          {\n\n            Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"重复\")\n\n            if(!this.repeat)\n            { // 重复标识为false, 记录开始重复时间\n              this.repeattime = this.pre.addtime\n              Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"第一次重复,开始重复计时\", this.repeattime)\n            }\n            // 重复\n            if(this.repeattime && item.addtime - this.repeattime > this.delay)\n            {\n              Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"超过重复时间间隔，上报日志\")\n            // 重复记录超过延时时间间隔，上报重复日志，清除重复次数，并重新记录重复日志\n              // 重复次数清1\n              item.times = 1\n              this.pre = item\n              this.repeat = false\n              this.timeoutId = setTimeout(function timeoutHandler(o) {\n                o.reporttime = Date.now();\n                ths.report(o)\n                Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"超过重复时间间隔，重新添加记录到队列\",o)\n              }, this.delay, item)\n            }\n            else\n            {\n              Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"未超过延时间隔，清除上报进程，重新记录\")\n              // 重复记录未超过延时时间间隔，清除队列中的上报进程，重复次数++，更新记录,并添加新的记录\n              item.times = this.pre.times + 1\n              this.timeoutId&&clearTimeout(this.timeoutId)\n              this.pre = item\n               // 重复标识设置为true\n              this.repeat = true\n              this.timeoutId = setTimeout(function timeoutHandler(o) {\n                o.reporttime = Date.now();\n                ths.report(o)\n                Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"未超过延时间隔，重新添加记录到队列\",o)\n              }, this.delay, item)\n            }\n\n          }\n          else\n          {\n            // 非重\n            Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"非重\")\n            this.pre = item;\n            this.repeat = false;\n            this.timeoutId = setTimeout(function timeoutHandler(o) {\n              o.reporttime = Date.now();\n              ths.report(o)\n              // debug_console(\"非重上报\",o)\n            }, this.delay, item)\n          }\n        }\n      }\n      else\n      { // 第一次请求\n        Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])(\"第一次请求\", item)\n        this.pre = item;\n        this.timeoutId = setTimeout(function timeoutHandler(o) {\n          o.reporttime = Date.now();\n          ths.report(o)\n        }, this.delay, item)\n      }\n      return this;\n    }\n\n    /**\n     * @params - item 节流后请求输出位置\n     */\n    this.report = function(item) {\n      Object(_debug_console_js__WEBPACK_IMPORTED_MODULE_0__[\"debug_console\"])('report', item, \"times:\", ++this.totaltimes)\n    }\n  }\n\n\n  \n\n//# sourceURL=webpack:///./src/Interceptor.js?");

/***/ }),

/***/ "./src/Log.js":
/*!********************!*\
  !*** ./src/Log.js ***!
  \********************/
/*! exports provided: Log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Log\", function() { return Log; });\nvar logId = 0;\nclass Log {\n  constructor({type, msg}){\n    this._id = logId++\n    this._type = type\n    this._msg = msg\n  }\n  set type(value) {\n    this._type = value\n  }\n  get type() {\n    return this._type\n  }\n  get id() {\n    return this._id\n  }\n  set msg(value) {\n    this._msg = value\n  }\n  get msg() {\n    return this._msg\n  }\n}\n\n\n//# sourceURL=webpack:///./src/Log.js?");

/***/ }),

/***/ "./src/debug_console.js":
/*!******************************!*\
  !*** ./src/debug_console.js ***!
  \******************************/
/*! exports provided: debug_console */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"debug_console\", function() { return debug_console; });\nvar debug = /debug_console/.test(location.search)\nfunction debug_console() {\n  if(debug) {\n    console.log.apply(console.log, arguments)\n  } \n}\n\n\n//# sourceURL=webpack:///./src/debug_console.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interceptor */ \"./src/Interceptor.js\");\n/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Log */ \"./src/Log.js\");\n\n\nvar interceptor = new _Interceptor__WEBPACK_IMPORTED_MODULE_0__[\"Interceptor\"]({\n  diff: function(o,n){\n    return o.msg === n.msg\n  }\n})\n\n// 添加测试用例\n// interceptor.add(new Log({type: \"type1\", msg: \"msg1\"}))\n// interceptor.add(new Log({type: \"type2\", msg: \"msg2\"}))\n// interceptor.add(new Log({type: \"type3\", msg: \"msg3\"}))\n\n// 循环添加10个相同记录\n\nvar times = 0;\nvar interval = setInterval(function intervalHandler() {\n  times++;\n  if(times > 10) {\n    clearInterval(interval)\n  }\n  interceptor.add(new _Log__WEBPACK_IMPORTED_MODULE_1__[\"Log\"]({type: \"type3\", msg: \"msg3\"}))\n}, 500)\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });