/**
 * Created by zhs007 on 2017/8/2.
 */

"use strict";

const { log, setLogFunc } = require('./src/logger');

const { Cmd } = require('./src/cmd');
const { Msg } = require('./src/msg');
const { BaseServ } = require('./src/baseserv');
const { BaseClient } = require('./src/baseclient');
const { GatewayServ } = require('./src/gatewayserv');

const { ClientIDMgr } = require('./src/clientidmgr');

const { Proto } = require('./src/proto');

const { fbs } = require('./proto/fbs/index');

const { CMDID } = require('./proto/cmddef');
const { MSGID } = require('./proto/msgdef');

const { RedisMgr } = require('./src/redismgr');

const { Crystal } = require('./proto/fbs/base_generated');

const { setCrystalCfg } = require('./src/config');
const util = require('./src/util');

const crystal = {
    log: log,
    setLogFunc: setLogFunc,

    Cmd: Cmd,
    Msg: Msg,
    BaseServ: BaseServ,
    BaseClient: BaseClient,
    GatewayServ: GatewayServ,

    ClientIDMgr: ClientIDMgr,

    Proto: Proto,

    fbs: fbs,

    MSGID: MSGID,

    Crystal: Crystal,

    RedisMgr: RedisMgr,

    setCrystalCfg: setCrystalCfg,

    util: util
};

exports.crystal = crystal;