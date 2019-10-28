var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        app.getUrl(this), app.getSystem(this);
    },
    tel: function(n) {
        var o = wx.getStorageSync("platform").tel;
        wx.makePhoneCall({
            phoneNumber: o
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});