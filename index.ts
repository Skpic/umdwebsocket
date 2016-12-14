
export type onMessageCallback = (buf: ArrayBuffer | string) => void;
export type onOpenCallback = () => void;
export type onCloseCallback = () => void;
export type onErrorCallback = () => void;

export default class umdwebsocket {

  private ws: WebSocket;
  private nowMs = 100;

  private connect() {
    this.ws = new WebSocket(this.addr, this.proto);
    this.ws.binaryType = "arraybuffer";

    this.ws.onmessage = (event) => {
      this._onMessage(event.data);
    };

    this.ws.onopen = () => {
      // console.log("[umdwebsocket] connect Success");
      this.nowMs = 100;
      this._onOpen();
    };

    this.ws.onclose = () => {
      // console.log("[umdwebsocket] reconnect", this.addr, "in", this.nowMs, "ms");
      delete this.ws;
      this._onClose();

      setTimeout(() => {
        this.connect();
      }, this.nowMs);
      this.nowMs = this.nowMs * 2;

      if (this.nowMs > this.reconnectMaxTimeS * 1000) {
        this.nowMs = this.reconnectMaxTimeS * 1000;
      }
    };

    this.ws.onerror = () => {
      // console.log("[umdwebsocket] connect Error");
      this._onError();
    };

  }

  constructor(private addr: string, private proto: string | Array<string>, private reconnectMaxTimeS: number,
    private _onMessage: onMessageCallback, private _onOpen: onOpenCallback,
    private _onClose: onCloseCallback, private _onError: onErrorCallback
  ) {
    this.connect();
  }

  // only support send arraybuffer
  send(buf: ArrayBuffer | string) {
    if (this.ws && this.ws.send && this.ws.readyState === this.ws.OPEN) {
      try {
        this.ws.send(buf);
      } catch (e) {

      }
    }
  }

  // reset connect and emit _onClose
  reset() {
    // console.log("[umdwebsocket] reconnect", this.addr, "initiative");
    this.ws.close();
  }

}
