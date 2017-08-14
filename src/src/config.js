/**
 * Created by zhs007 on 2017/8/8.
 */

"use strict";

var crystalConfig = {
    KEY_HEAD: 'crystaljs',

    REDISID: 'main',
    CACHE_REDISID: 'cache',

    TIMEOUT_CLIENTID: 72 * 60 * 60,
    TIMEOUT_SERVID: 72 * 60 * 60,

    SERVKEY_LENGTH: 32,

    SERV_NAME: 'serv',
};

function setCrystalCfg(key, val) {
    crystalConfig[key] = val;
}

function getCrystalCfg(key) {
    return crystalConfig[key];
}

exports.setCrystalCfg = setCrystalCfg;
exports.getCrystalCfg = getCrystalCfg;