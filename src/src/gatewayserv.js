/**
 * Created by zhs007 on 2017/8/1.
 */

"use strict";

const { BaseServ } = require('./baseserv');
const { BaseClient } = require('./baseclient');
const { GatewayServIDMgr } = require('./gatewayserdidmgr');
const { ClientIDMgr } = require('./clientidmgr');
const { log } = require('./logger');

class GatewayServ extends BaseServ {

    constructor(host, port, protoBaseCmd, protoBaseMsg) {
        super(host, port, protoBaseCmd, protoBaseMsg);

        this.mapServClient = {};
        this.mgrServID = new GatewayServIDMgr();
        this.servidGateway = -1;
        this.mgrClientID = new ClientIDMgr(this.servidGateway);
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

    // 一个新连接过来，初始化客户端数据
    async onInitClientData(ws) {
        const clientid = await this.mgrClientID.newClientID();

        let cd = {
            clientid: clientid
        };

        return cd;
    }

    // 处理实际的网关消息
    onProcGatewayCmd(ws, clientData, cmdid, cmdobj) {

    }
};

exports.GatewayServ = GatewayServ;