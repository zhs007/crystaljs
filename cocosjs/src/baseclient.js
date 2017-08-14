/**
 * Created by zhs007 on 2017/8/10.
 */

var crystal = crystal || {};

var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

crystal.BaseClient = cc.Class.extend({

    ctor: function (addrServ, protoBaseCmd, protoBaseMsg, isAsyncProcMsg) {
        this.ws = undefined;
        this.addrServ = addrServ;

        this.isForceClose = false;

        this.curctrlid = 1;

        this.protoBaseCmd = protoBaseCmd;
        this.protoBaseMsg = protoBaseMsg;

        this.mapCmd = {};
        this.mapMsg = {};

        this.cmdSendQueue = new crystal.CmdSendQueue(this);
        this.msgProcQueue = new crystal.MsgProcQueue(this);

        this.regMsg(new crystal.ALLMSG[crystal.MSGID.CMDRET]());

        this.isAsyncProcMsg = isAsyncProcMsg;
    },

    onConnect: function () {
    },

    onMessage: function (data, flags) {
        var basemsg = this.parseMsg(data);
        this.msgProcQueue.pushMsg(basemsg);

        if (!this.isAsyncProcMsg) {
            this.asyncProcMsg();
        }
    },

    asyncProcMsg: function () {
        this.msgProcQueue.procMsgQueue(this.cmdSendQueue.cur);
    },

    parseMsg: function (buf) {
        var basemsg = this.protoBaseMsg.decode(new Uint8Array(buf));

        if (this.mapMsg.hasOwnProperty(basemsg.msgid)) {
            var msg = this.mapMsg[basemsg.msgid];
            var msgobj = this.mapMsg[basemsg.msgid].proto.decode(basemsg.buf);

            basemsg.msg = msg;
            basemsg.msgobj = msgobj;

            return basemsg;
        }

        return basemsg;
    },

    procMsg: function (basemsg) {
        if (basemsg.msg == undefined) {
            return this.onUndefinedMsg(basemsg);
        }

        if (basemsg.msgid == crystal.MSGID.CMDRET) {
            return this.onMsg_CmdRet(basemsg);
        }

        return false;
    },

    onUndefinedMsg: function (basemsg) {
        console.log('BaseClient.onUndefinedMsg ' + JSON.stringify(basemsg));

        return false;
    },

    onMsg_CmdRet: function (basemsg) {
        console.log('BaseClient.onMsg_CmdRet ' + JSON.stringify(basemsg));

        // this.cmdSendQueue.onRecvCmdRet(basemsg);

        return true;
    },

    onClose: function (code, message) {
        //log.log('info', util.format('service onClose %j %j', code, message));
    },

    onError: function (error) {
        //log.log('error', util.format('service onError %j', error));
    },

    start: function () {
        this.reconnect();
    },

    reconnect: function () {
        var self = this;

        if (this.ws != undefined) {
            this.ws.close();
        }

        this.ws = new WebSocket(this.addrServ);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = function(evt) {
            self.onConnect();
        };

        this.ws.onmessage = function(evt) {
            self.onMessage(evt.data, evt.flags);
        };

        this.ws.onerror = function(evt) {
            self.onError(error);

            if (!self.isForceClose) {
                self.reconnect();
            }
        };

        this.ws.onclose = function(evt) {
            self.onClose(evt.code, evt.message);

            if (!self.isForceClose) {
                self.reconnect();
            }
        };

        // this.ws.on('open', function () {
        //     this.onConnect();
        // });
        //
        // this.ws.on('message', function (data, flags) {
        //     this.onMessage(data, flags);
        // });
        //
        // this.ws.on('close', function (code, message) {
        //     this.onClose(code, message);
        //
        //     if (!this.isForceClose) {
        //         this.reconnect();
        //     }
        // });
        //
        // this.ws.on('error', function (error) {
        //     this.onError(error);
        //
        //     if (!this.isForceClose) {
        //         this.reconnect();
        //     }
        // });
    },

    close: function () {
        this.isForceClose = true;
        this.ws.close();
    },

    buildBaceCmd: function (cmdid, buf) {
        return {cmdid: cmdid, ctrlid: this.curctrlid++, buf: buf};
    },

    sendBaseCmd: function (basecmd, callback) {
        this.cmdSendQueue.pushCmd(basecmd, callback);
        this.cmdSendQueue.procCmdQueue();
    },

    __sendBaseCmd: function (basecmd) {
        if (this.ws != null) {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(this.protoBaseCmd.encode(basecmd));
            }
        }
    },

    regCmd: function (cmd) {
        this.mapCmd[cmd.cmdid] = cmd;
    },

    regMsg: function (msg) {
        this.mapMsg[msg.msgid] = msg;
    },

    sendCmd: function (cmdid, obj, callback) {
        var buf = this.mapCmd[cmdid].proto.encode(obj);
        var basecmd = this.buildBaceCmd(cmdid, buf);
        this.sendBaseCmd(basecmd, callback);
    }
});