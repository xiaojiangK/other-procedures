App({
    globalData: {
        userInfo: null,
        rande: 1,
        source: 1,
        scene: []
    },
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    onLaunch: function(options) {
        if (typeof options.query.scene == 'string') {
            const scene = decodeURIComponent(options.query.scene);
            this.globalData.scene = scene.split(',');
        }
    },
    getUrl: function(e) {
        var n = this;
        var t = this.globalData.url;
        if (t) {
            e.setData({
                url: t
            });
        } else {
            n.util.request({
                url: "entry/wxapp/attachurl",
                success: function(t) {
                    n.globalData.url = t.data, n.getUrl(e);
                }
            });
        }
    },
    getSystem: function(e) {
        var a = this;
        var t = this.globalData.color, n = this.globalData.system;
        if (t) {
            e.setData({
                color: t,
                platform: n
            })
        } else {
            a.util.request({
                url: "entry/wxapp/GetSystem",
                success: function(t) {
                    a.globalData.color = t.data.color, a.globalData.system = t.data, 
                    a.getSystem(e);
                    wx.setStorageSync("platform", t.data);
                }
            });
        }
        t && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t
        });
    },
    getUserInfo: function(o) {
        var n = this;
        wx.login({
            success: function(t) {
                n.util.request({
                    url: "entry/wxapp/Openid",
                    cachetime: "0",
                    data: {
                        code: t.code
                    },
                    success: function(t) {
                        getApp().session_key = t.data.session_key, getApp().OpenId = t.data.openid, getApp().getSK = t.data.session_key;
                        var e = t.data.openid;
                        wx.getSetting({
                            success: function(t) {
                                1 != t.authSetting["scope.userInfo"] ? (n.util.request({
                                        url: "entry/wxapp/login",
                                        cachetime: "0",
                                        data: {
                                            openid: e,
                                            img: "",
                                            name: ""
                                        },
                                        success: function(t) {
                                            getApp().getuniacid = t.data.uniacid, getApp().user_info = t.data, wx.setStorageSync("userInfo", t.data), 
                                            o(t.data);
                                            var e = getCurrentPages(), n = e[e.length - 1];
                                            n.options;
                                        }
                                    })) : (console.log("检测到用户已经授权"), wx.getUserInfo({
                                    withCredentials: !1,
                                    success: function(t) {
                                        n.util.request({
                                            url: "entry/wxapp/login",
                                            cachetime: "0",
                                            data: {
                                                openid: e,
                                                img: t.userInfo.avatarUrl,
                                                name: t.userInfo.nickName
                                            },
                                            success: function(t) {
                                                getApp().getuniacid = t.data.uniacid, getApp().user_info = t.data, wx.setStorageSync("userInfo", t.data), 
                                                o(t.data);
                                            }
                                        });
                                    }
                                }));
                            }
                        });
                    }
                });
            }
        });
    },
    max: function(t) {
        t = t[0];
        for (var e = t.length, n = 1; n < e; n++) t[n] > t && (t = t[n]);
        return t;
    },
    today_time: function(t) {
        var e = new Date(), n = e.getMonth() + 1, a = e.getDate();
        return 1 <= n && n <= 9 && (n = "0" + n), 0 <= a && a <= 9 && (a = "0" + a), e.getFullYear() + "-" + n + "-" + a + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
    },
    hours_time: function(t, e) {
        var n = new Date(t.replace("-", "/")), a = 60 * (e = Number(e));
        return n.setMinutes(n.getMinutes() + a, n.getSeconds(), 0), n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
    },
    today: function() {
        var t = new Date(), e = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate();
        return 1 <= n && n <= 9 && (n = "0" + n), 0 <= a && a <= 9 && (a = "0" + a), e + "-" + n + "-" + a;
    },
    ormatDate: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + n(e.getMonth() + 1, 2) + "-" + n(e.getDate(), 2) + " " + n(e.getHours(), 2) + ":" + n(e.getMinutes(), 2) + ":" + n(e.getSeconds(), 2);
        function n(t, e) {
            for (var n = "" + t, a = n.length, o = "", r = e; r-- > a; ) o += "0";
            return o + n;
        }
    },
    sort_price_Reverse: function(t, e) {
        return t.zd_money - e.zd_money;
    },
    sort_price_order: function(t, e) {
        return e.zd_money - t.zd_money;
    },
    sort_num_order: function(t, e) {
        return t - e;
    },
    sort_distance_order: function(t, e) {
        return t.distance - e.distance;
    },
    sort_distance_Reverse: function(t, e) {
        return e.distance - t.distance;
    },
    time_title: function(t, e) {
        return !(e <= t) || (wx.showModal({
            title: "",
            content: "时间选择错误"
        }), !1);
    },
    getTime2Time: function(t, e) {
        t = t, e = e;
        return ((t = Date.parse(t) / 1e3) - (e = Date.parse(e) / 1e3)) / 86400;
    },
    getSys: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.globalData.sysInfo = t, e.globalData.windowW = t.windowWidth, e.globalData.windowH = t.windowHeight;
            }
        });
    }
});