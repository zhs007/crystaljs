/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { log } = require('../../src/logger');
const { Msg } = require('../../src/msg');
const { MSGID } = require('../../proto/msgdef');
const { fbs } = require('../../proto/fbs/index');

class MsgCmdRet extends Msg {

    constructor() {
        super(MSGID.CMDRET, new fbs.Proto_MsgCmdRet());
    }

    // buildMsg(cmdid, isok) {
    //     return this.proto.encode({cmdid: cmdid, isok: isok});
    // }
}

exports.MsgCmdRet = MsgCmdRet;