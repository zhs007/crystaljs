/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

class CmdSendQueue {

    constructor(client) {
        this.client = client;
        this.lst = [];
        this.cur = undefined;
    }

    pushCmd(basecmd, callback) {
        this.lst.push({basecmd: basecmd, callback: callback});
    }

    procCmdQueue() {
        if (this.cur != undefined || this.lst.length <= 0) {
            return this.lst.length;
        }

        this.cur = this.lst[0];
        this.lst.splice(0, 1);

        this.client.__sendBaseCmd(this.cur.basecmd);

        return this.lst.length;
    }

    onRecvCmdRet(basemsg) {
        if (this.cur == undefined) {
            return false;
        }

        if (this.cur.basecmd.ctrlid == basemsg.ctrlid) {
            this.cur = undefined;

            this.procCmdQueue();

            return true;
        }

        return false;
    }
};

exports.CmdSendQueue = CmdSendQueue;