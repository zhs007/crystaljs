/**
 * Created by zhs007 on 2017/8/8.
 */

"use strict";

const { Proto } = require('../../src/proto');
const { flatbuffers } = require('./flatbuffers');
const { Crystal } = require('./generated/base_generated');

class Proto_BaseCmd extends Proto {
    constructor() {
        super();
    }

    decode(buf) {
        var bb = new flatbuffers.ByteBuffer(buf);
        let basecmd = Crystal.BaseCmd.getRootAsBaseCmd(bb);

        return {
            cmdid: basecmd.cmdid(),
            ctrlid: basecmd.ctrlid(),
            buf: basecmd.bufArray()
        };
    }

    encode(obj) {
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
};

exports.Proto_BaseCmd = Proto_BaseCmd;