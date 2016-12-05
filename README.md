# umdwebsocket

a irresponsible websocket client util

## usage

```bash
npm install umdwebsocket
```

## example

```javascript
var umdwebsocket_1 = require("umdwebsocket");
function wsmessage(buf) {
    console.log("msg", buf);
}
function wsopen() {
    console.log("wsopen");
}
function wsclose() {
    console.log("wsclose");
}
function wserror() {
    console.log("wserror");
}
var xx = new umdwebsocket_1.default("ws://127.0.0.1:9999", ["proto1", "proto2"], 10, wsmessage, wsopen, wsclose, wserror);
xx.send("123");
```
