/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { Proto } = require('../../src/proto');
const { flatbuffers } = require('./flatbuffers');
const { Crystal } = require('./generated/base_generated');

class Proto_CmdConnectServ extends Proto {
    constructor() {
        super();
    }

    decode(buf) {
        var bb = new flatbuffers.ByteBuffer(buf);
        let cmdconnectserv = Crystal.CmdConnectServ.getRootAsCmdConnectServ(bb);

        return {
            servkey: cmdconnectserv.servkey()
        };
    }

    encode(obj) {
        var fbb = new flatbuffers.Builder(1);

        var servkey_off = fbb.createString(obj.servkey);

        Crystal.CmdConnectServ.startCmdConnectServ(fbb);
        Crystal.CmdConnectServ.addServkey(fbb, servkey_off);
        fbb.finish(Crystal.CmdConnectServ.endCmdConnectServ(fbb));

        return fbb.asUint8Array();
    }
};

exports.Proto_CmdConnectServ = Proto_CmdConnectServ;