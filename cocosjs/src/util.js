/**
 * Created by zhs007 on 2017/8/12.
 */

var crystal = crystal || {};

function toFBSLong(val) {
    return new fbs.flatbuffers.Long(val & 0xffffffff, ((val & 0xffffffff) >> 32));
}

function toNumber_FBSLong(fbslong) {
    return fbslong.low + (fbslong.high << 32);
}

crystal.util = {
    toFBSLong: toFBSLong,
    toNumber_FBSLong: toNumber_FBSLong
};