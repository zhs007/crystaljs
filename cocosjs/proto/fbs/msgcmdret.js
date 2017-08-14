/**
 * Created by zhs007 on 2017/8/9.
 */

var crystal = crystal || {};
crystal.fbs = crystal.fbs || {};

crystal.fbs.Proto_MsgCmdRet = crystal.Proto.extend({
    ctor: function () {
        this._super();
    },

    decode: function (buf) {
        var bb = new flatbuffers.ByteBuffer(buf);
        var msgcmdret = Crystal.MsgCmdRet.getRootAsMsgCmdRet(bb);

        return {
            cmdid: msgcmdret.cmdid(),
            isok: msgcmdret.isok()
        };
    },

    encode: function (obj) {
        var fbb = new flatbuffers.Builder(1);

        var cmdidoff = fbb.createString(obj.cmdid);

        Crystal.MsgCmdRet.startMsgCmdRet(fbb);
        Crystal.MsgCmdRet.addCmdid(fbb, cmdidoff);
        Crystal.MsgCmdRet.addIsok(fbb, obj.isok);
        fbb.finish(Crystal.MsgCmdRet.endMsgCmdRet(fbb));

        return fbb.asUint8Array();
    }
});