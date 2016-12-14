export declare type onMessageCallback = (buf: ArrayBuffer | string) => void;
export declare type onOpenCallback = () => void;
export declare type onCloseCallback = () => void;
export declare type onErrorCallback = () => void;
export default class umdwebsocket {
    private addr;
    private proto;
    private reconnectMaxTimeS;
    private _onMessage;
    private _onOpen;
    private _onClose;
    private _onError;
    private ws;
    private nowMs;
    private connect();
    constructor(addr: string, proto: string | Array<string>, reconnectMaxTimeS: number, _onMessage: onMessageCallback, _onOpen: onOpenCallback, _onClose: onCloseCallback, _onError: onErrorCallback);
    send(buf: ArrayBuffer | string): void;
    reset(): void;
}
