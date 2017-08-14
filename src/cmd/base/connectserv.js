/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { log } = require('../../src/logger');
const { Cmd } = require('../../src/cmd');
const { CMDID } = require('../../proto/cmddef');
const { fbs } = require('../../proto/fbs/index');

class CmdConnectServ extends Cmd {

    constructor() {
        super(CMDID.CONNECTSERV, new fbs.Proto_CmdConnectServ());
    }

    async onProcCmd(serv, ws, clientData, basecmd) {
        log('CmdConnectServ ' + JSON.stringify(clientData) + ' ' + JSON.stringify(basecmd));

        return true;
    }
}

exports.CmdConnectServ = CmdConnectServ;