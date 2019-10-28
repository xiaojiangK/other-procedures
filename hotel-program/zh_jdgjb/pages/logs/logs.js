var util = require("../../utils/util.js"), app = getApp();

Page({
    data: {
        users: !0,
        level_name: "初始会员",
        score: 0,
        balance: 0,
        isAuthorizeNumber: false,
        coupon_length: 0
    },
    onLoad: function(e) {
        wx.getStorage({
            key: 'isAuthorizeNumber',
            success: (res)=>{
                this.setData({ isAuthorizeNumber: true });
            }
        });
        app.getUrl(this), app.getSystem(this);
    },
    getPhoneNumber: function(e) {
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            wx.setStorage({
                key: 'isAuthorizeNumber',
                data: true
            });
            this.setData({ isAuthorizeNumber: true });
        }
    },
    refresh: function(e) {
        var t = this, n = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/MyCoupons",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(e) {
                t.setData({
                    coupon_length: e.data.length
                });
            }
        }), app.util.request({
            url: "entry/wxapp/CheckRz",
            data: {
                user_id: n
            },
            success: function(e) {
                t.setData({
                    state: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/GetFxSet",
            success: function(e) {
                t.setData({
                    GetFxSet: e.data
                });
            }
        });
    },
    mine_order: function(e) {
        if (1 == this.data.users) {
            var t = e.currentTarget.dataset.index, n = t;
            wx.navigateTo({
                url: "../order/order?activeIndex=" + n + "&index=" + t,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            });
        } else this.bind_user_info();
    },
    home: function(e) {
        wx.reLaunch({
            url: "../hotel_list/hotel_info"
        });
    },
    opensetting: function(e) {
        wx.openSetting({});
    },
    service: function(e) {
        1 == this.data.users ? wx.navigateTo({
            url: "../service/service"
        }) : this.bind_user_info();
    },
    cancel_storange: function(e) {
        wx.clearStorage(), wx.showToast({
            title: "清除成功"
        });
    },
    copyright: function(e) {
        var t = wx.getStorageSync("platform").tz_appid;
        wx.navigateToMiniProgram({
            appId: t,
            success: function(e) {
                console.log(e);
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        app.getUserInfo(function(e) {
            t.setData({
                userInfo: e,
                balance: e.balance,
                score: Number(e.score)
            }), t.refresh();
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});