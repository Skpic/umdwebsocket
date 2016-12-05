"use strict";
var umdwebsocket = (function () {
    function umdwebsocket(addr, proto, reconnectMaxTimeS, _onMessage, _onOpen, _onClose, _onError) {
        this.addr = addr;
        this.proto = proto;
        this.reconnectMaxTimeS = reconnectMaxTimeS;
        this._onMessage = _onMessage;
        this._onOpen = _onOpen;
        this._onClose = _onClose;
        this._onError = _onError;
        this.nowMs = 100;
        this.connect();
    }
    umdwebsocket.prototype.connect = function () {
        var _this = this;
        this.ws = new WebSocket(this.addr, this.proto);
        this.ws.binaryType = "arraybuffer";
        this.ws.onmessage = function (event) {
            _this._onMessage(event.data);
        };
        this.ws.onopen = function () {
            // console.log("[umdwebsocket] connect Success");
            _this.nowMs = 100;
            _this._onOpen();
        };
        this.ws.onclose = function () {
            // console.log("[umdwebsocket] reconnect", this.addr, "in", this.nowMs, "ms");
            delete _this.ws;
            _this._onClose();
            _this.timer = setTimeout(function () {
                _this.connect();
            }, _this.nowMs);
            _this.nowMs = _this.nowMs * 2;
            if (_this.nowMs > _this.reconnectMaxTimeS * 1000) {
                _this.nowMs = _this.reconnectMaxTimeS * 1000;
            }
        };
        this.ws.onerror = function () {
            // console.log("[umdwebsocket] connect Error");
            _this._onError();
        };
    };
    // only support send arraybuffer
    umdwebsocket.prototype.send = function (buf) {
        if (this.ws && this.ws.send && this.ws.readyState === this.ws.OPEN) {
            try {
                this.ws.send(buf);
            }
            catch (e) {
            }
        }
    };
    // reset connect and emit _onClose
    umdwebsocket.prototype.reset = function () {
        clearTimeout(this.timer);
        // console.log("[umdwebsocket] reconnect", this.addr, "initiative");
        delete this.ws;
        this._onClose();
        this.connect();
    };
    return umdwebsocket;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = umdwebsocket;
//# sourceMappingURL=index.js.map