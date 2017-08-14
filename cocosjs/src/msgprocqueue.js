/**
 * Created by zhs007 on 2017/8/11.
 */

var crystal = crystal || {};

crystal.MsgProcQueue = cc.Class.extend({

    ctor: function (client) {
        this.client = client;
        this.lst = [];
        this.cur = undefined;

        this.msgCache = [];
    },

    pushMsg: function (basemsg) {
        this.lst.push({basemsg: basemsg});
    },

    procMsgQueue: function () {
        if (this.cur != undefined || this.lst.length <= 0) {
            return true;
        }

        while (this.lst.length > 0) {
            this.cur = this.lst[0];
            this.lst.splice(0, 1);

            this.client.procMsg(this.cur.basemsg);
            this.msgCache.push(this.cur);

            if (this.cur.basemsg.msgid == crystal.MSGID.CMDRET) {
                if (this.client.cmdSendQueue.cur != undefined && this.client.cmdSendQueue.cur.basecmd.ctrlid == this.cur.basemsg.ctrlid) {
                    var arr = this.getAllMsg(this.client.cmdSendQueue.cur.basecmd.ctrlid);
                    this.client.cmdSendQueue.cur.callback(arr);

                    this.client.cmdSendQueue.onRecvCmdRet(this.cur.basemsg);
                }
            }

            this.cur = undefined;
        }

        return false;
    },

    getAllMsg: function (ctrlid) {
        var arr = [];
        for (var ii = 0; ii < this.msgCache.length;) {
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
});