export type onMessageCallback = (buf: ArrayBuffer|string) => void;
export type onOpenCallback = () => void;
export type onCloseCallback = () => void;
export type onErrorCallback = () => void;

export class umdwebsocket {

    constructor(addr: string, proto: string, reconnectMaxTimeS: number,
        _onMessage: onMessageCallback,_onOpen: onOpenCallback,
        _onClose: onCloseCallback,_onError: onErrorCallback
    );

    /**
     * send buf
     */
    send(buf: ArrayBuffer|string);

    /**
     * close
     */
    close();
}

export default umdwebsocket;