/**
 * Created by zhs007 on 2017/8/9.
 */

var crystal = crystal || {};
crystal.fbs = crystal.fbs || {};

crystal.fbs.Proto_BaseMsg = crystal.Proto.extend({
    ctor: function () {
        this._super();
    },

    decode: function (buf) {
        var bb = new flatbuffers.ByteBuffer(buf);
        var basemsg = Crystal.BaseMsg.getRootAsBaseMsg(bb);

        return {
            msgid: basemsg.msgid(),
            ctrlid: basemsg.ctrlid(),
            buf: basemsg.bufArray()
        };
    },

    encode: function (obj) {
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
});