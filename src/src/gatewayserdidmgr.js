/**
 * Created by zhs007 on 2017/8/8.
 */

"use strict";

const { RedisMgr } = require('./redismgr');
const { log } = require('./logger');
const { getCrystalCfg } = require('./config');

class GatewayServIDMgr {

    constructor() {
        this.REDISID = getCrystalCfg('REDISID');
        this.KEY_HEAD = getCrystalCfg('KEY_HEAD');
        this.TIMEOUT_SERVID = getCrystalCfg('TIMEOUT_SERVID');
    }

    async newServID() {
        try {
            const redisconn = RedisMgr.singleton.getRedisConn(this.REDISID);
            if (redisconn != undefined) {
                const rkey = this.KEY_HEAD + ':' + 'gatewayservid';
                const servid = await redisconn.incr(rkey);
                redisconn.expire(rkey, this.TIMEOUT_SERVID);
                return servid;
            }
        }
        catch (err) {
            log('GatewayServIDMgr.newServID() err ' + JSON.stringify(err));

            return -1;
        }

        return -1;
    }
};

exports.GatewayServIDMgr = GatewayServIDMgr;