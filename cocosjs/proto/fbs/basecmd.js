/**
 * Created by zhs007 on 2017/8/8.
 */

var crystal = crystal || {};
crystal.fbs = crystal.fbs || {};

crystal.fbs.Proto_BaseCmd = crystal.Proto.extend({
    ctor: function () {
        this._super();
    },

    decode: function (buf) {
        var bb = new flatbuffers.ByteBuffer(buf);
        var basecmd = Crystal.BaseCmd.getRootAsBaseCmd(bb);

        return {
            cmdid: basecmd.cmdid(),
            ctrlid: basecmd.ctrlid(),
            buf: basecmd.bufArray()
        };
    },

    encode: function (obj) {
        var fbb = new flatbuffers.Builder(1);

        var cmdidoff = fbb.createString(obj.cmdid);
        var bufoff = Crystal.BaseCmd.createBufVector(fbb, obj.buf);

        Crystal.BaseCmd.startBaseCmd(fbb);
        Crystal.BaseCmd.addCmdid(fbb, cmdidoff);
        Crystal.BaseCmd.addCtrlid(fbb, obj.ctrlid);
        Crystal.BaseCmd.addBuf(fbb, bufoff);
        fbb.finish(Crystal.BaseCmd.endBaseCmd(fbb));

        return fbb.asUint8Array();
    }
});