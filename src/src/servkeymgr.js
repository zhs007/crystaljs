/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { RedisMgr } = require('./redismgr');
const { log } = require('./logger');
const { getCrystalCfg } = require('./config');
const { BASESTRCODE, generateString } = require('./util');

class ServKeyMgr {

    constructor() {
        this.REDISID = getCrystalCfg('REDISID');
        this.KEY_HEAD = getCrystalCfg('KEY_HEAD');
        this.SERVKEY_LENGTH = getCrystalCfg('SERVKEY_LENGTH');
    }

    async generateServKey(servName) {
        let key = generateString(BASESTRCODE, this.SERVKEY_LENGTH);

        try {
            const redisconn = RedisMgr.singleton.getRedisConn(this.REDISID);
            if (redisconn != undefined) {
                const rkey = this.KEY_HEAD + ':servkey:' + servName;
                await redisconn.set(rkey, key);
                return key;
            }
        }
        catch (err) {
            log('ServKeyMgr.generateServKey() err ' + JSON.stringify(err));

            return undefined;
        }

        return undefined;
    }

    async getServKey(servName) {
        try {
            const redisconn = RedisMgr.singleton.getRedisConn(this.REDISID);
            if (redisconn != undefined) {
                const rkey = this.KEY_HEAD + ':servkey:' + servName;
                return await redisconn.get(rkey);
            }
        }
        catch (err) {
            log('ServKeyMgr.getServKey() err ' + JSON.stringify(err));

            return undefined;
        }

        return undefined;
    }
};

exports.ServKeyMgr = ServKeyMgr;