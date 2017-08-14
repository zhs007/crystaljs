/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { Proto } = require('../../src/proto');
const { flatbuffers } = require('./flatbuffers');
const { Crystal } = require('./base_generated');

class Proto_MsgCmdRet extends Proto {
    constructor() {
        super();
    }

    decode(buf) {
        var bb = new flatbuffers.ByteBuffer(buf);
        let msgcmdret = Crystal.MsgCmdRet.getRootAsMsgCmdRet(bb);

        return {
            cmdid: msgcmdret.cmdid(),
            isok: msgcmdret.isok()
        };
    }

    encode(obj) {
        var fbb = new flatbuffers.Builder(1);

        var cmdidoff = fbb.createString(obj.cmdid);

        Crystal.MsgCmdRet.startMsgCmdRet(fbb);
        Crystal.MsgCmdRet.addCmdid(fbb, cmdidoff);
        Crystal.MsgCmdRet.addIsok(fbb, obj.isok);
        fbb.finish(Crystal.MsgCmdRet.endMsgCmdRet(fbb));

        return fbb.asUint8Array();
    }
};

exports.Proto_MsgCmdRet = Proto_MsgCmdRet;