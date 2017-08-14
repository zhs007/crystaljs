/**
 * Created by zhs007 on 2017/8/2.
 */

"use strict";

class Msg {

    // funcProc(client, basemsg)
    constructor(msgid, proto, funcProc) {
        this.msgid = msgid;
        this.proto = proto;
        this.funcProc = funcProc;
    }

    // buildMsg(obj) {
    //     return this.proto.encode(obj);
    // }

};

exports.Msg = Msg;