
export type onMessageCallback = (buf: ArrayBuffer | string) => void;
export type onOpenCallback = () => void;
export type onCloseCallback = () => void;
export type onErrorCallback = () => void;

export default class umdwebsocket {

  private ws: WebSocket;
  private nowMs: number;
  private timer: number;

  private connect() {
    this.ws = new WebSocket(this.addr, this.proto);
    this.ws.binaryType = "arraybuffer";

    this.ws.onmessage = (event) => {
      this._onMessage(event.data);
    };

    this.ws.onopen = (event) => {
      console.log("[umdwebsocket] connect Success");
      this.nowMs = 100;
      this._onOpen();
    };

    this.ws.onclose = (event) => {
      console.log("[umdwebsocket] reconnect", this.addr, "in", this.nowMs, "ms");
      delete this.ws;
      this._onClose();

      this.timer = setTimeout(() => {
        this.connect();
      }, this.nowMs);
      this.nowMs = this.nowMs * 2;

      if (this.nowMs > this.reconnectMaxTimeS * 1000) {
        this.nowMs = this.reconnectMaxTimeS * 1000;
      }
    };

    this.ws.onerror = (event) => {
      console.log("[umdwebsocket] connect Error");
      this._onError();
    };

  }

  constructor(private addr: string, private proto: string, private reconnectMaxTimeS: number,
    private _onMessage: onMessageCallback, private _onOpen: onOpenCallback,
    private _onClose: onCloseCallback, private _onError: onErrorCallback
  ) {
    this.nowMs = 100;
    this.connect();

  }

  // only support send arraybuffer
  send(buf: ArrayBuffer | string) {
    this.ws.send(buf);
  }

  // reset connect and emit _onClose
  reset() {
    clearTimeout(this.timer);
    console.log("[umdwebsocket] reconnect", this.addr, "initiative");
    delete this.ws;
    this._onClose();
    this.connect();
  }

}
