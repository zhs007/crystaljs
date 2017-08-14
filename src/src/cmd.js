/**
 * Created by zhs007 on 2017/8/2.
 */

"use strict";

class Cmd {

    constructor(cmdid, proto) {
        this.cmdid = cmdid;
        this.proto = proto;
    }

    checkParam(ws, cmdobj) {
        var args = Array.prototype.slice.call(arguments, 2);

        while(args[args.length - 1] === null) {
            args.pop();
        }

        for (var i = 0; i < args.length; ++i) {
            if (!cmdobj.hasOwnProperty(args[i])) {
                return false;
            }
        }

        return true;
    }

    // parse(buf) {
    //     return this.proto.decode(buf);
    // }

    async onProcCmd(serv, ws, clientData, basecmd) {
        return false;
    }
};

exports.Cmd = Cmd;