/**
 * Created by zhs007 on 2017/8/1.
 */

"use strict";

const WebSocketServer = require('ws').Server;
const { log } = require('./logger');
const { CmdProcQueue } = require('./cmdprocqueue');
const { ALLMSG } = require('../msg/allmsg');
const { MSGID } = require('../proto/msgdef');

class BaseServ {

    constructor(host, port, protoBaseCmd, protoBaseMsg) {
        this.mapCmd = {};
        this.mapMsg = {};

        this.host = host;
        this.port = port;

        this.protoBaseCmd = protoBaseCmd;
        this.protoBaseMsg = protoBaseMsg;

        this.regMsg(new ALLMSG[MSGID.CMDRET]());
    }

    async onInit() {
        return true;
    }

    async start() {
        let wss = new WebSocketServer({
            host: this.host,
            port: this.port
        });

        this.wss = wss;

        wss.on('connection', (ws) => {
            this.onConnect(ws);

            ws.on('message', (message) => {
                this.onRecvCmd(ws, message);
                // let cmd = this.onParseCmd(message);
                // this.onProcCmd(ws, cmd.cmdid, cmd.cmdobj);
            });

            ws.on('close', (code, message) => {
                this.onClose(ws);
            });

            ws.on('error', (error) => {
                this.onError(error);
            });
        });

        const isinitok = await this.onInit();

        log('serv ' + this.host + ':' + this.port + ' init ok!');

        return isinitok;
    }

    onRecvCmd(ws, buf) {
        ws.cmdProcQueue.pushCmd(ws, buf);
        ws.cmdProcQueue.procCmdQueue();
    }

    async procCmd(ws, buf) {
        let basecmd = this.parseCmd(buf);
        if (basecmd.cmd == undefined) {
            return this.onProcUndefinedCmd(ws, basecmd.cmdid);
        }

        let clientData = await this.getClientData(ws);
        return await basecmd.cmd.onProcCmd(this, ws, clientData, basecmd);

        // return await this.onProcCmd(ws, cmd.cmdid, cmd.cmdobj);
    }

    async getClientData(ws) {
        if (ws.hasOwnProperty('clientData')) {
            return ws.clientData;
        }

        ws.clientData = await this.onInitClientData(ws);

        return ws.clientData;
    }

    // 一个新连接过来，初始化客户端数据
    async onInitClientData(ws) {
        let cd = {};

        return cd;
    }

    onConnect(ws) {
        ws.cmdProcQueue = new CmdProcQueue(this);
    }

    onClose(ws) {

    }

    onError(ws) {

    }

    onProcUndefinedCmd(ws, cmdid) {
        log('BaseServ proc undefined cmd ' + cmdid);

        return false;
    }

    regCmd(cmd) {
        this.mapCmd[cmd.cmdid] = cmd;
    }

    sendBaseMsg(ws, basemsg) {
        ws.send(this.protoBaseMsg.encode(basemsg));
    }

    sendMsg(ws, msgid, ctrlid, buf) {
        this.sendBaseMsg(ws, {msgid: msgid, ctrlid: ctrlid, buf: buf});
    }

    regMsg(msg) {
        this.mapMsg[msg.msgid] = msg;
    }

    parseCmd(buf) {
        let basecmd = this.protoBaseCmd.decode(buf);

        if (this.mapCmd.hasOwnProperty(basecmd.cmdid)) {
            let cmd = this.mapCmd[basecmd.cmdid];
            let cmdobj = this.mapCmd[basecmd.cmdid].proto.decode(basecmd.buf);

            basecmd.cmd = cmd;
            basecmd.cmdobj = cmdobj;

            return basecmd;
        }

        return basecmd;
    }


    sendMsg_CmdRet(ws, ctrlid, cmdid, isok) {
        this.sendMsg(ws, MSGID.CMDRET, ctrlid, this.mapMsg[MSGID.CMDRET].proto.encode({cmdid: cmdid, isok: isok}));
    }
};

exports.BaseServ = BaseServ;