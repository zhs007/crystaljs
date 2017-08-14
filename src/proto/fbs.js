/**
 * Created by zhs007 on 2017/8/14.
 */

"use strict";

const { CMDID } = require('./cmddef');
const { MSGID } = require('./msgdef');

const { Proto_BaseCmd } = require('./fbs/basecmd');
const { Proto_GatewayBaseCmd } = require('./fbs/gatewaybasecmd');
const { Proto_BaseMsg } = require('./fbs/basemsg');

const { Proto_CmdConnectServ } = require('./fbs/cmdconnectserv');

const { Proto_MsgCmdRet } = require('./fbs/msgcmdret');

const { flatbuffers } = require('./fbs/flatbuffers');

exports.Proto_BaseCmd = Proto_BaseCmd;
exports.Proto_GatewayBaseCmd = Proto_GatewayBaseCmd;
exports.Proto_BaseMsg = Proto_BaseMsg;

exports.Proto_CmdConnectServ = Proto_CmdConnectServ;

exports.Proto_MsgCmdRet = Proto_MsgCmdRet;

exports.flatbuffers = flatbuffers;

const CMDPROTO = {};
const MSGPROTO = {};

CMDPROTO[CMDID.CONNECTSERV] = Proto_CmdConnectServ;

MSGPROTO[MSGID.CMDRET] = Proto_MsgCmdRet;

exports.CMDID = CMDID;
exports.MSGID = MSGID;

exports.CMDPROTO = CMDPROTO;
exports.MSGPROTO = MSGPROTO;