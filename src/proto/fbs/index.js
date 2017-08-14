/**
 * Created by zhs007 on 2017/8/8.
 */

"use strict";

const { Proto_BaseCmd } = require('./basecmd');
const { Proto_GatewayBaseCmd } = require('./gatewaybasecmd');
const { Proto_BaseMsg } = require('./basemsg');

const { Proto_CmdConnectServ } = require('./cmdconnectserv');

const { Proto_MsgCmdRet } = require('./msgcmdret');

const { flatbuffers } = require('./flatbuffers');

const fbs = {
    Proto_BaseCmd: Proto_BaseCmd,
    Proto_GatewayBaseCmd: Proto_GatewayBaseCmd,
    Proto_BaseMsg: Proto_BaseMsg,

    Proto_CmdConnectServ: Proto_CmdConnectServ,

    Proto_MsgCmdRet: Proto_MsgCmdRet,

    flatbuffers: flatbuffers
};

exports.fbs = fbs;