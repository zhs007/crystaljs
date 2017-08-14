/**
 * Created by zhs007 on 2017/8/11.
 */

var crystal = crystal || {};

crystal.Msg = cc.Class.extend({

    ctor: function (msgid, proto) {
        this.msgid = msgid;
        this.proto = proto;
    },

    onProcMsg: function (client, basemsg) {
        return false;
    }
});
