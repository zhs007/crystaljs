/**
 * Created by zhs007 on 2017/8/9.
 */

"use strict";

const { MSGID } = require('../proto/msgdef');

class MsgProcQueue {

    constructor(client) {
        this.client = client;
        this.lst = [];
        this.cur = undefined;

        this.msgCache = [];
    }

    pushMsg(basemsg) {
        this.lst.push({basemsg: basemsg});
    }

    async procMsgQueue() {
        if (this.cur != undefined || this.lst.length <= 0) {
            return true;
        }

        while (this.lst.length > 0) {
            this.cur = this.lst[0];
            this.lst.splice(0, 1);

            await this.client.procMsg(this.cur.basemsg);
            this.msgCache.push(this.cur);

            if (this.cur.basemsg.msgid == MSGID.CMDRET) {
                if (this.client.cmdSendQueue.cur != undefined && this.client.cmdSendQueue.cur.basecmd.ctrlid == this.cur.basemsg.ctrlid) {
                    let arr = this.getAllMsg(this.client.cmdSendQueue.cur.basecmd.ctrlid);
                    this.client.cmdSendQueue.cur.callback(arr);

                    this.client.cmdSendQueue.onRecvCmdRet(this.cur.basemsg);
                }
            }

            this.cur = undefined;
        }

        return false;
    }

    getAllMsg(ctrlid) {
        let arr = [];
        for (let ii = 0; ii < this.msgCache.length;) {
            if (this.msgCache[ii].basemsg.ctrlid == ctrlid) {
                arr.push(this.msgCache[ii].basemsg);
                this.msgCache.splice(ii, 1);
            }
            else {
                ++ii;
            }
        }

        return arr;
    }
};

exports.MsgProcQueue = MsgProcQueue;