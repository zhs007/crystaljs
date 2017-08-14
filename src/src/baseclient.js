/**
 * Created by zhs007 on 2017/8/1.
 */

"use strict";

const WebSocket = require('ws');
const { log } = require('./logger');
const { CmdSendQueue } = require('./cmdsendqueue');
const { MsgProcQueue } = require('./msgprocqueue');
const { ALLMSG } = require('../msg/allmsg');
const { MSGID } = require('../proto/msgdef');

class BaseClient {

    constructor(addrServ, protoBaseCmd, protoBaseMsg, isAsyncProcMsg) {
        this.ws = undefined;
        this.addrServ = addrServ;

        this.isForceClose = false;
        // this.lstCmdCallback = [];

        this.curctrlid = 1;

        this.protoBaseCmd = protoBaseCmd;
        this.protoBaseMsg = protoBaseMsg;

        this.mapCmd = {};
        this.mapMsg = {};

        this.cmdSendQueue = new CmdSendQueue(this);
        this.msgProcQueue = new MsgProcQueue(this);

        this.regMsg(new ALLMSG[MSGID.CMDRET]());

        this.isAsyncProcMsg = isAsyncProcMsg;
    }

    // onParseMsg(buf) {
    //     return {msgid: undefined, msgobj: undefined};
    // }

    onConnect() {
    }

    onMessage(data, flags) {
        let basemsg = this.parseMsg(data);
        this.msgProcQueue.pushMsg(basemsg);

        if (!this.isAsyncProcMsg) {
            this.asyncProcMsg();
        }
    }

    asyncProcMsg() {
        this.msgProcQueue.procMsgQueue(this.cmdSendQueue.cur);
    }

    parseMsg(buf) {
        let basemsg = this.protoBaseMsg.decode(buf);

        if (this.mapMsg.hasOwnProperty(basemsg.msgid)) {
            let msg = this.mapMsg[basemsg.msgid];
            let msgobj = this.mapMsg[basemsg.msgid].proto.decode(basemsg.buf);

            basemsg.msg = msg;
            basemsg.msgobj = msgobj;

            return basemsg;
        }

        return basemsg;
    }

    procMsg(basemsg) {
        if (basemsg.msg == undefined) {
            return this.onUndefinedMsg(basemsg);
        }

        if (basemsg.msgid == MSGID.CMDRET) {
            return this.onMsg_CmdRet(basemsg);
        }

        return basemsg.msg.onProcMsg(this, basemsg);
    }

    onUndefinedMsg(basemsg) {
        log('BaseClient.onUndefinedMsg ' + JSON.stringify(basemsg));

        return false;
    }

    onMsg_CmdRet(basemsg) {
        log('BaseClient.onMsg_CmdRet ' + JSON.stringify(basemsg));

        // this.cmdSendQueue.onRecvCmdRet(basemsg);

        return true;
    }

    onClose(code, message) {
        //log.log('info', util.format('service onClose %j %j', code, message));
    }

    onError(error) {
        //log.log('error', util.format('service onError %j', error));
    }

    start() {
        this.reconnect();
    }

    reconnect() {
        if (this.ws != undefined) {
            this.ws.close();
        }

        this.ws = new WebSocket(this.addrServ);

        this.ws.on('open', () => {
            this.onConnect();
        });

        this.ws.on('message', (data, flags) => {
            this.onMessage(data, flags);
        });

        this.ws.on('close', (code, message) => {
            this.onClose(code, message);

            if (!this.isForceClose) {
                this.reconnect();
            }
        });

        this.ws.on('error', (error) => {
            this.onError(error);

            if (!this.isForceClose) {
                this.reconnect();
            }
        });
    }

    close() {
        this.isForceClose = true;
        this.ws.close();
    }

    // send(msgobj, callback) {
    //     this._addCmdCallback(msgobj.cmdid, msgobj, callback);
    //     this._send(msgobj);
    // }

    buildBaceCmd(cmdid, buf) {
        return {cmdid: cmdid, ctrlid: this.curctrlid++, buf: buf};
    }

    sendBaseCmd(basecmd, callback) {
        this.cmdSendQueue.pushCmd(basecmd, callback);
        this.cmdSendQueue.procCmdQueue();
    }

    sendCmd(cmdid, obj, callback) {
        let buf = this.mapCmd[cmdid].proto.encode(obj);
        let basecmd = this.buildBaceCmd(cmdid, buf);
        this.sendBaseCmd(basecmd, callback);
    }

    __sendBaseCmd(basecmd) {
        if (this.ws != null) {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(this.protoBaseCmd.encode(basecmd));
            }
        }
    }

    // _addCmdCallback(cmdid, msgobj, callback) {
    //     this.lstCmdCallback.push({cmdid: cmdid, msgobj: msgobj, callback: callback});
    // }
    //
    // _send(msgobj) {
    //     if (this.ws != null) {
    //         if (this.ws.readyState === WebSocket.OPEN) {
    //             this.ws.send(JSON.stringify(msgobj));
    //         }
    //     }
    // }

    // _send_errjson() {
    //     if (this.ws != null) {
    //         if (this.ws.readyState === WebSocket.OPEN) {
    //             this.ws.send('{err:"haha');
    //         }
    //     }
    // }
    //
    // onCmdCallback(cmdid, isok) {
    //     if (this.lstCmdCallback.length > 0) {
    //         if (this.lstCmdCallback[0].cmdid == cmdid) {
    //             if (this.lstCmdCallback[0].callback != undefined) {
    //                 this.lstCmdCallback[0].callback(isok);
    //             }
    //
    //             this.lstCmdCallback.shift();
    //         }
    //     }
    // }

    regCmd(cmd) {
        this.mapCmd[cmd.cmdid] = cmd;
    }

    regMsg(msg) {
        this.mapMsg[msg.msgid] = msg;
    }
};

exports.BaseClient = BaseClient;