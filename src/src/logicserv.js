/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { BaseServ } = require('./baseserv');
const { BaseClient } = require('./baseclient');
const { GatewayServIDMgr } = require('./gatewayserdidmgr');
const { ClientIDMgr } = require('./clientidmgr');
const { log } = require('./logger');

class LogicServ extends BaseServ {

    constructor(host, port, protoBaseCmd) {
        super(host, port, protoBaseCmd);
    }

    async onInit() {
        this.servidGateway = await this.mgrServID.newServID();
        if (this.servidGateway > 0) {
            log('GatewayServ servid is ' + this.servidGateway);

            this.mgrClientID.servidGateway = this.servidGateway;

            // this.mgrClientID = new ClientIDMgr(this.keyHead, this.redisid, this.servidGateway);

            return true;
        }

        return false;
    }

    // async onCmd(ws, cmdid, cmdobj) {
    //     let clientData = await this.getClientData(ws);
    //
    //     this.onProcGatewayCmd(ws, clientData, cmdid, cmdobj);
    // }

    addServClient(servName, addrServ) {
        this.mapServClient[servName] = new BaseClient(addrServ);
        this.mapServClient[servName].start();
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
        const clientid = await this.mgrClientID.newClientID();

        let cd = {
            clientid: clientid
        };

        return cd;
    }
};

exports.LogicServ = LogicServ;