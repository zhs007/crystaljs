/**
 * Created by zhs007 on 2017/8/8.
 */

"use strict";

const { BaseClient } = require('./baseclient');

// const { NewFish } = require('../proto/newfish_generated');
// const { CMDID } = require('../proto/cmddef');
// const { MSGID } = require('../proto/msgdef');

class GatewayClient extends BaseClient {

    constructor(servAddr, protoBaseCmd) {
        super(servAddr, protoBaseCmd);
    }

    // onParseMsg(buf) {
    //     let msgobj = this.msgParser.parse(buf);
    //     return {msgid: msgobj.msgid, msgobj: msgobj};
    // }

    onConnect() {
        // this.sendCmd_Login('zhs007', 'ptt', () => {
        //
        // });
    }

    // sendCmd_Login(uname, businessid, callback) {
    //     var fbb = new flatbuffers.Builder(1);
    //
    //     var uname_off = fbb.createString(uname);
    //     var businessid_off = fbb.createString(businessid);
    //
    //     NewFish.CmdLogin.startCmdLogin(fbb);
    //     NewFish.CmdLogin.addUname(fbb, uname_off);
    //     NewFish.CmdLogin.addBusinessid(fbb, businessid_off);
    //     fbb.finish(NewFish.CmdLogin.endCmdLogin(fbb));
    //
    //     this.__sendCmd(CMDID.LOGIN, new Buffer(fbb.asUint8Array()));
    // }
};

exports.GatewayClient = GatewayClient;