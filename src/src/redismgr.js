/**
 * Created by zhs007 on 2017/8/7.
 */

const { log } = require('./logger');
const Redis = require('ioredis');
const async = require('async');

class RedisMgr {

    constructor() {
        this.mapRedisConn = {};
    }

    getRedisConn(redisid) {
        if (this.mapRedisConn.hasOwnProperty(redisid)) {
            return this.mapRedisConn[redisid];
        }

        return undefined;
    }

    __newRedisConn(redisid, rediscfg, callback) {
        log('RedisMgr newRedisConn ' + redisid + ':' + JSON.stringify(rediscfg) + ' ...');

        let curredis = new Redis(rediscfg);

        curredis.initok = false;
        curredis.connectok = false;
        curredis.initcallbackok = false;

        curredis.on("connect", function () {
            log('RedisMgr newRedisConn ' + redisid + ':' + JSON.stringify(rediscfg) + ' ok!');

            curredis.connectok = true;

            if (curredis.initok && !curredis.initcallbackok) {
                curredis.initcallbackok = true;

                callback();
            }
        });

        this.mapRedisConn[redisid] = curredis;

        curredis.initok = true;

        if (curredis.connectok) {
            callback();
        }
    }

    start(mapCfg, callback) {
        async.forEachOfSeries(mapCfg, (val, key, next) => {
            this.__newRedisConn(key, val, function () {
                next();
            });
        }, (err) => {
            if (err) {
                log('RedisMgr.start error ' + JSON.stringify(mapCfg) + JSON.stringify(err));
                // logger.log('err', 'redismgr.init ', rediscfg, err);
            }

            callback();
        });

        // for (let redisid in mapCfg) {
        //     this.__newRedisConn(redisid, mapCfg[redisid]);
        // }
    }
};

RedisMgr.singleton = new RedisMgr();

exports.RedisMgr = RedisMgr;