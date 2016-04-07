(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("umdwebsocket", [], factory);
	else if(typeof exports === 'object')
		exports["umdwebsocket"] = factory();
	else
		root["umdwebsocket"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var umdwebsocket = function () {
	    function umdwebsocket(addr, proto, reconnectMaxTimeS, _onMessage, _onOpen, _onClose, _onError) {
	        this.addr = addr;
	        this.proto = proto;
	        this.reconnectMaxTimeS = reconnectMaxTimeS;
	        this._onMessage = _onMessage;
	        this._onOpen = _onOpen;
	        this._onClose = _onClose;
	        this._onError = _onError;
	        this._nowMs = 100;
	        this.connect();
	    }
	    umdwebsocket.prototype.connect = function () {
	        var _this = this;
	        this.ws = new WebSocket(this.addr, this.proto);
	        this.ws.binaryType = "arraybuffer";
	        this.ws.onmessage = function (event) {
	            _this._onMessage(event.data);
	        };
	        this.ws.onopen = function (event) {
	            console.log("[umdwebsocket] connect Success");
	            _this._nowMs = 100;
	            _this._onOpen();
	        };
	        this.ws.onclose = function (event) {
	            console.log("[umdwebsocket] reconnect", _this.addr, "in", _this._nowMs, "ms");
	            _this._onClose();
	            setTimeout(function () {
	                _this.connect();
	            }, _this._nowMs);
	            _this._nowMs = _this._nowMs * 2;
	            if (_this._nowMs > _this.reconnectMaxTimeS * 1000) {
	                _this._nowMs = _this.reconnectMaxTimeS * 1000;
	            }
	        };
	        this.ws.onerror = function (event) {
	            console.log("[umdwebsocket] connect Error");
	            _this._onError();
	        };
	    };
	    umdwebsocket.prototype.send = function (buf) {
	        this.ws.send(buf);
	    };
	    umdwebsocket.prototype.close = function () {
	        this.ws.close();
	    };
	    return umdwebsocket;
	}();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = umdwebsocket;

/***/ }
/******/ ])
});
;