/**
 * Created by zhs007 on 2017/8/2.
 */

"use strict";

class Msg {

    constructor(msgid, proto) {
        this.msgid = msgid;
        this.proto = proto;
    }

    // buildMsg(obj) {
    //     return this.proto.encode(obj);
    // }

};

exports.Msg = Msg;