/**
 * Created by zhs007 on 2017/8/11.
 */

var crystal = crystal || {};

crystal.MsgCmdRet = crystal.Msg.extend({

    ctor: function () {
        this._super(crystal.MSGID.CMDRET, new crystal.fbs.Proto_MsgCmdRet());
    },

    buildMsg: function (cmdid, isok) {
        return this.proto.encode({cmdid: cmdid, isok: isok});
    }
});
