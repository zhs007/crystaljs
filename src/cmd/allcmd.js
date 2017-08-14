/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { CMDID } = require('../proto/cmddef');

const { CmdConnectServ } = require('./base/connectserv');

var ALLCMD = {};

ALLCMD[CMDID.CONNECTSERV] = CmdConnectServ;

exports.ALLCMD = ALLCMD;