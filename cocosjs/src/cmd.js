/**
 * Created by zhs007 on 2017/8/11.
 */

var crystal = crystal || {};

crystal.Cmd = cc.Class.extend({

    ctor: function (cmdid, proto) {
        this.cmdid = cmdid;
        this.proto = proto;
    },
});
