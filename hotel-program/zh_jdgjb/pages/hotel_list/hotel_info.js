var app = getApp();

Page({
    data: {
        activeIndex: 0,
        isAuthorizeNum: false,
        isAuthorizeUser: false,
        platform: {},
        listData: [
            {
                type: 'list',
                data:  ['列表一','列表二','列表三','列表四']
            },
            {
                type: 'img-box',
                data: ['https://www.baidu.com/img/bd_logo1.png?where=super']
            }
        ]
    },
    onLoad: function() {
        // option 参数
        const scene = app.globalData.scene;
        const t = {
            hotel_id: 20,
            type: 20,
            uid: scene[1]
        };
        if (t.uid) {
            app.globalData.source = 2;
        }
        var e = this;
        app.getUrl(e), app.getSystem(e), e.date();
        const platform = wx.getStorageSync("platform");
        e.setData({
            platform: platform ? platform : {}
        });
        e.data.text;
        if (null == t.hotel_id) var o = scene[0]; else o = t.hotel_id;
        e.setData({
            hotel_id: o,
            start: app.util.time(),
            end: app.util.addDate(app.util.time(), 28)
        }), e.refresh();
    },
    goLogs: function(e) {
        wx.reLaunch({
            url: "../logs/logs"
        });
    },
    getPhoneNumber: function(e) {
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            wx.setStorage({
                key: 'isAuthorizeNumber',
                data: true
            });
            this.setData({ isAuthorizeNum: true });
        }
    },
    bindGetUserInfo() {
        app.getUserInfo((e) => {
            this.setData({
                userInfo: e,
                balance: e.balance,
                score: Number(e.score),
                isAuthorizeUser: true
            });
        });
    },
    date: function(t) {
        var e = wx.getStorageSync("day1"), a = wx.getStorageSync("day2"), o = wx.getStorageSync("day"), i = app.util.time();
        if (wx.setStorageSync("datein", n), "" == e) {
            var n = app.util.time();
            wx.setStorageSync("datein", n);
        } else if (e < i) n = i; else n = e;
        if ("" == a) var r = app.util.addDate(i, 1); else {
            var s = app.util.addDate(i, 1);
            if (a < s) r = s; else r = a;
        }
        o = app.util.day(r, n);
        wx.setStorageSync("day1", n), wx.setStorageSync("day2", r), wx.setStorageSync("day", o), 
        this.setData({
            datein: n,
            dateout: r,
            time: o,
            current_date: n
        });
    },
    refresh: function(t) {
        var i = this;
        i.setData({
            luntext: [ "房型列表", "酒店详情", "酒店评价"]
        });
        var e = i.data.hotel_id, n = i.data.day1;
        app.util.request({
            url: "entry/wxapp/PjDetails",
            cachetime: "0",
            data: {
                seller_id: e
            },
            success: function(t) {
                i.setData({
                    hotel: t.data
                });
                wx.setNavigationBarTitle({
                    title: t.data.name
                });
            }
        });
        n = wx.getStorageSync("day1");
        var r = app.util.addDate(n, 1);
        app.util.request({
            url: "entry/wxapp/RoomList",
            cachetime: "0",
            data: {
                seller_id: e
            },
            success: function(t) {
                var a = t.data;
                e = function(e) {
                    app.util.request({
                        url: "entry/wxapp/GetRoomCost",
                        data: {
                            room_id: a[e].id,
                            start: n,
                            end: r
                        },
                        success: function(t) {
                            a[e].price = t.data[0].mprice;
                            const room = a.map(item => {
                                return {
                                    ...item,
                                    price: Number.parseInt(item.price)
                                }
                            });
                            i.setData({ room });
                        }
                    }), app.util.request({
                        url: "entry/wxapp/GetRoomNum",
                        data: {
                            room_id: a[e].id,
                            start: n,
                            end: r
                        },
                        success: function(t) {
                            a[e].room_num = t.data[0].nums;
                            const room = a.map(item => {
                                return {
                                    ...item,
                                    price: Number.parseInt(item.price)
                                }
                            });
                            i.setData({ room });
                        }
                    });
                };
                for (var o in a) e(o);
            }
        }), app.util.request({
            url: "entry/wxapp/AssessList",
            cachetime: "0",
            data: {
                seller_id: e
            },
            success: function(t) {
                for (var e in t.data) "" != t.data[e].img && (t.data[e].img = t.data[e].img.split(",")), 
                t.data[e].time = app.ormatDate(t.data[e].time).slice(0, 10), t.data[e].content = t.data[e].content.replace("↵", "\n");
                i.setData({
                    assess_list: t.data.slice(0, 5)
                });
            }
        });
        wx.getStorage({
            key: 'isAuthorizeNumber',
            success: (res)=>{
                this.setData({ isAuthorizeNum: true });
            }
        });
        if (!!wx.getStorageSync('userInfo')) {
            this.setData({ isAuthorizeUser: true });
        }
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    bindDateChange1: function(t) {
        var e = this, a = t.detail.value, o = (e.data.dateout, e.data.current_date, app.util.addDate(a, 1));
        wx.setStorageSync("day1", a), wx.setStorageSync("day2", o), wx.setStorageSync("day", i);
        var i = app.getTime2Time(o, a);
        e.setData({
            datein: t.detail.value,
            dateout: o,
            time: i
        }), this.refresh();
    },
    bindDateChange2: function(t) {
        var e = this.data.datein, a = t.detail.value;
        var o = app.getTime2Time(a, e);
        if (o < 1) {
            wx.showToast({
                title: '退房日期不能小于入住日期',
                icon: 'none'
            });
            return;
        }
        wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", o), 
        this.setData({
            dateout: t.detail.value,
            time: o
        });
    },
    room_info: function(t) {
        this.data.hotel.id;
        var e = this.data.hotel;
        var a = e.tel, o = e.coordinates, i = e.address, n = e.name;
        wx.navigateTo({
            url: "room_info?coordinates=" + o + "&room_id=" + t.currentTarget.dataset.id + "&tel=" + a + "&address=" + i + "&name=" + n + "&price=" + t.currentTarget.dataset.price
        });
    },
    order: function(t) {},
    all_comment: function(t) {
        wx.navigateTo({
            url: "all_comment?seller_id=" + this.data.hotel_id
        });
    },
    sele_address: function(t) {
        var o = this.data.hotel, i = o.coordinates.split(",");
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                var e = Number(i[0]), a = Number(i[1]);
                wx.openLocation({
                    latitude: e,
                    longitude: a,
                    name: o.name,
                    address: o.address
                });
            }
        });
    },
    call_phone: function(t) {
        wx.makePhoneCall({
            phoneNumber: this.data.hotel.tel
        });
    },
    previewImage: function(t) {
        var e = this.data.url, a = [], o = t.currentTarget.id, i = t.currentTarget.dataset.index, n = this.data.assess_list;
        for (var r in n) if (o == n[r].id) var s = n[r].img;
        for (var d in s) a.push(e + s[d]);
        wx.previewImage({
            current: e + s[i],
            urls: a
        });
    },
    formSubmit: function(t) {
        var e = t.detail.formId;
        var i = wx.getStorageSync("day1"), n = wx.getStorageSync("day2");
        1 == app.time_title(i, n) ? wx.navigateTo({
            url: "../place_order/place_order?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + e
        }) : '';
    },
    hotel_in: function(t) {
        wx.navigateTo({
            url: "hotel_in?seller_id=" + t.currentTarget.dataset.id
        });
    },
    bindgetuserinfo: function(t) {
        "getUserInfo:fail auth deny" == t.detail.errMsg && wx.showModal({
            title: "",
            content: "您拒绝了个人信息授权，无法正常使用小程序"
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});