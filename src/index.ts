"use strict";

type onMessageCallback = (buf: ArrayBuffer|string) => void;
type onOpenCallback = () => void;
type onCloseCallback = () => void;
type onErrorCallback = () => void;

export default class umdwebsocket {

  private ws: WebSocket;
  private _nowMs: number;

  private connect(){
    this.ws=new WebSocket(this.addr,this.proto);
    this.ws.binaryType="arraybuffer";



    this.ws.onmessage=(event)=>{
      this._onMessage(event.data)
    };

    this.ws.onopen=(event)=>{
      console.log("[umdwebsocket] connect Success");
      this._nowMs=100;
      this._onOpen();
    };

    this.ws.onclose=(event)=>{
      console.log("[umdwebsocket] reconnect",this.addr,"in",this._nowMs,"ms");
      this._onClose();

      setTimeout(()=>{
        this.connect();
      },this._nowMs);
      this._nowMs=this._nowMs*2;

      if(this._nowMs>this.reconnectMaxTimeS*1000){
        this._nowMs=this.reconnectMaxTimeS*1000;
      }
    };

    this.ws.onerror=(event)=>{
      console.log("[umdwebsocket] connect Error");
      this._onError();
    };


  }



  constructor(private addr: string, private proto: string, private reconnectMaxTimeS: number,
    private _onMessage: onMessageCallback,private _onOpen: onOpenCallback,
    private _onClose: onCloseCallback,private _onError: onErrorCallback
  ){
    this._nowMs=100;
    this.connect();

  }

  send(buf: ArrayBuffer|string){
    this.ws.send(buf);
  }

  close(){
    this.ws.close();
  }


}

