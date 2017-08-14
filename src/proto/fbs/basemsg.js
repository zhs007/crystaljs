/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { Proto } = require('../../src/proto');
const { flatbuffers } = require('./flatbuffers');
const { Crystal } = require('./base_generated');

class Proto_BaseMsg extends Proto {
    constructor() {
        super();
    }

    decode(buf) {
        var bb = new flatbuffers.ByteBuffer(buf);
        let basemsg = Crystal.BaseMsg.getRootAsBaseMsg(bb);

        return {
            msgid: basemsg.msgid(),
            ctrlid: basemsg.ctrlid(),
            buf: basemsg.bufArray()
        };
    }

    encode(obj) {
        var fbb = new flatbuffers.Builder(1);

        var msgid_off = fbb.createString(obj.msgid);
        var buf_off = Crystal.BaseCmd.createBufVector(fbb, obj.buf);

        Crystal.BaseMsg.startBaseMsg(fbb);
        Crystal.BaseMsg.addMsgid(fbb, msgid_off);
        Crystal.BaseMsg.addCtrlid(fbb, obj.ctrlid);
        Crystal.BaseMsg.addBuf(fbb, buf_off);
        fbb.finish(Crystal.BaseMsg.endBaseMsg(fbb));

        return fbb.asUint8Array();
    }
};

exports.Proto_BaseMsg = Proto_BaseMsg;