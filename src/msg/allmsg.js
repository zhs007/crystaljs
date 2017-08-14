/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { MSGID } = require('../proto/msgdef');

const { MsgCmdRet } = require('./base/cmdret');

var ALLMSG = {};

ALLMSG[MSGID.CMDRET] = MsgCmdRet;

exports.ALLMSG = ALLMSG;