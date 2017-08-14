/**
 * Created by zhs007 on 2017/8/8.
 */

"use strict";

const { Proto } = require('../../src/proto');
const { flatbuffers } = require('./flatbuffers');
const { Crystal } = require('./generated/base_generated');

class Proto_GatewayBaseCmd extends Proto {
    constructor() {
        super();
    }

    decode(buf) {
        var bb = new flatbuffers.ByteBuffer(buf);
        let basecmd = Crystal.GatewayBaseCmd.getRootAsGatewayBaseCmd(bb);

        return {
            gatewayid: basecmd.gatewayid(),
            clientid: basecmd.clientid(),
            cmdid: basecmd.cmdid(),
            ctrlid: basecmd.ctrlid(),
            buf: basecmd.bufArray()
        };
    }

    encode(obj) {
        var fbb = new flatbuffers.Builder(1);

        var cmdidoff = fbb.createString(obj.cmdid);
        var bufoff = Crystal.BaseCmd.createBufVector(fbb, obj.buf);

        Crystal.GatewayBaseCmd.startGatewayBaseCmd(fbb);
        Crystal.GatewayBaseCmd.addGatewayid(fbb, obj.gatewayid);
        Crystal.GatewayBaseCmd.addClientid(fbb, obj.clientid);
        Crystal.GatewayBaseCmd.addCmdid(fbb, cmdidoff);
        Crystal.GatewayBaseCmd.addCtrlid(fbb, obj.ctrlid);
        Crystal.GatewayBaseCmd.addBuf(fbb, bufoff);
        fbb.finish(Crystal.GatewayBaseCmd.endGatewayBaseCmd(fbb));

        return fbb.asUint8Array();
    }
};

exports.Proto_GatewayBaseCmd = Proto_GatewayBaseCmd;