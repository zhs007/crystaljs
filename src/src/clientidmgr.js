/**
 * Created by zhs007 on 2017/8/8.
 */

"use strict";

const { RedisMgr } = require('./redismgr');
const { log } = require('./logger');
const { getCrystalCfg } = require('./config');

class ClientIDMgr {

    constructor(servidGateway) {
        this.servidGateway = servidGateway;

        this.REDISID = getCrystalCfg('REDISID');
        this.KEY_HEAD = getCrystalCfg('KEY_HEAD');
        this.TIMEOUT_CLIENTID = getCrystalCfg('TIMEOUT_CLIENTID');
    }

    async newClientID() {
        if (this.servidGateway <= 0) {
            return -1;
        }

        try {
            const redisconn = RedisMgr.singleton.getRedisConn(this.REDISID);
            if (redisconn != undefined) {
                const rkey = this.KEY_HEAD + ':' + this.servidGateway + ':clientid';
                const clientid = await redisconn.incr(rkey);
                redisconn.expire(rkey, this.TIMEOUT_CLIENTID);
                return clientid;
            }
        }
        catch (err) {
            log('ClientIDMgr.newClientID() err ' + JSON.stringify(err));

            return -1;
        }

        return -1;
    }
};

exports.ClientIDMgr = ClientIDMgr;