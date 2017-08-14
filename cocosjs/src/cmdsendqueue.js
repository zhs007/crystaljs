/**
 * Created by zhs007 on 2017/8/11.
 */

var crystal = crystal || {};

crystal.CmdSendQueue = cc.Class.extend({

    ctor: function (client) {
        this.client = client;
        this.lst = [];
        this.cur = undefined;
    },

    pushCmd: function (basecmd, callback) {
        this.lst.push({basecmd: basecmd, callback: callback});
    },

    procCmdQueue: function () {
        if (this.cur != undefined || this.lst.length <= 0) {
            return this.lst.length;
        }

        this.cur = this.lst[0];
        this.lst.splice(0, 1);

        this.client.__sendBaseCmd(this.cur.basecmd);

        return this.lst.length;
    },

    onRecvCmdRet: function (basemsg) {
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
});