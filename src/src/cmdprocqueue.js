/**
 * Created by zhs007 on 2017/8/8.
 */

"use strict";

class CmdProcQueue {

    constructor(serv) {
        this.serv = serv;
        this.lst = [];
        this.cur = undefined;
    }

    pushCmd(ws, buf) {
        this.lst.push({ws: ws, buf: buf});
    }

    async procCmdQueue() {
        if (this.cur != undefined || this.lst.length <= 0) {
            return true;
        }

        while (this.lst.length > 0) {
            this.cur = this.lst[0];
            this.lst.splice(0, 1);

            await this.serv.procCmd(this.cur.ws, this.cur.buf);
            this.cur = undefined;
        }

        return false;
    }
};

exports.CmdProcQueue = CmdProcQueue;