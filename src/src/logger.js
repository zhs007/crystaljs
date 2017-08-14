/**
 * Created by zhs007 on 2017/8/7.
 */

"use strict";

var funcLog = undefined;

function log_default(str) {
    console.log(str);
}

function log(str) {
    funcLog(str);
}

function setLogFunc(func) {
    funcLog = func;
}

funcLog = log_default;

exports.log = log;
exports.setLogFunc = setLogFunc;