/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { fbs } = require('../proto/fbs/index');

const BASESTRCODE = 'abcdefghijklmnopqrstuvwxyz0123456789';

function generateString(strdef, nums) {
    let str = '';
    for (let ii = 0; ii < nums; ++ii) {
        str += strdef.charAt(Math.floor(Math.random() * strdef.length));
    }

    return str;
}

function cloneObj(dest, src) {
    for (let key in src) {
        dest[key] = src[key];
    }

    return dest;
}

function toFBSLong(val) {
    return new fbs.flatbuffers.Long(val & 0xffffffff, ((val & 0xffffffff) >> 32));
}

function toNumber_FBSLong(fbslong) {
    return fbslong.low + (fbslong.high << 32);
}

exports.generateString = generateString;
exports.BASESTRCODE = BASESTRCODE;
exports.cloneObj = cloneObj;
exports.toFBSLong = toFBSLong;
exports.toNumber_FBSLong = toNumber_FBSLong;