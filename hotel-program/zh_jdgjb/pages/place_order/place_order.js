var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, app = getApp();

Page({
    data: {
        time: "20:00",
        num: 1,
        see_price: !1,
        red_bag: 0,
        red_bag_id: 0,
        mode1: "success",
        mode2: "clear",
        mode3: "clear",
        refrer_to: "确认支付",
        pay_num: 1,
        type: 1
    },
    onLoad: function(e) {
        console.log(app);
        var o = this;
        app.getUrl(o), app.getSystem(o);
        var t = e.room_id, a = e.hotel_id, n = wx.getStorageSync("day1"), s = wx.getStorageSync("day2"), d = wx.getStorageSync("day");
        o.setData({
            room_id: t,
            hotel_id: a,
            day1: n,
            day2: s,
            day: d,
            coupon: 0,
            condition: 0,
            coupons_id: -1,
            form_d: e.form_d,
            grade: wx.getStorageSync("platform").open_member
        });
        var i = 0;
        app.util.request({
            url: "entry/wxapp/GetRoomCost",
            data: {
                room_id: t,
                start: n,
                end: s
            },
            success: function(e) {
                for (var t in e.data) i += Number(e.data[t].mprice);
                o.setData({
                    z_price: i,
                    price_infos: e.data
                }), o.refresh(), o.room_num();
            }
        });
    },
    userinfo: function(e) {
        var t = this;
        app.getUserInfo(function(e) {
            t.setData({
                userInfo: e
            });
        });
    },
    refresh: function(e) {
        var a = this, t = a.data.room_id, o = a.data.hotel_id;
        2 == a.data.grade ? (a.setData({
            discount: 1
        }), a.data.z_price) : app.getUserInfo(function(e) {
            var t = e.id;
            var o = e.discount;
            null == o && (o = 10), a.setData({
                discount: o / 10
            }), null != a.data.z_price && a.cost();
        });
        var n = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/MyCoupons",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(e) {
                a.setData({
                    coupons: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/RoomDetails",
            cachetime: "0",
            data: {
                room_id: t
            },
            success: function(e) {
                e.data.price, e.data.yj_cost;
                a.setData({
                    room: e.data,
                    yj_cost: Number(e.data.yj_cost)
                }), a.cost();
            }
        }), app.util.request({
            url: "entry/wxapp/PjDetails",
            cachetime: "0",
            data: {
                seller_id: o
            },
            success: function(e) {
                a.setData({
                    hotel: e.data
                }), 1 != e.data.wx_open && 1 != e.data.ye_open && a.mode2();
            }
        }), app.util.request({
            url: "entry/wxapp/MyHb",
            cachetime: "0",
            data: {
                user_id: n,
                page: 1
            },
            success: function(e) {
                a.setData({
                    my_hb: e.data
                });
            }
        });
    },
    room_num: function(e) {
        var n = this, t = wx.getStorageSync("day1"), o = wx.getStorageSync("day2"), a = n.data.room_id;
        app.util.request({
            url: "entry/wxapp/GetRoomNum",
            data: {
                room_id: a,
                start: t,
                end: o
            },
            success: function(e) {
                var t = [], o = [];
                for (var a in e.data.map(function(e) {
                    var t;
                    t = Number(e.nums), o.push(t);
                }), e.data) e.data[a].nums <= 0 && t.push(e.data[a]);
                o = o.sort(app.sort_num_order), n.setData({
                    rooms: o[0]
                }), 0 < t.length && wx.showModal({
                    title: "",
                    content: t[0].dateday + "没有房间了",
                    success: function(e) {
                        e.confirm ? (wx.navigateBack({
                            delta: 1
                        })) : e.cancel && (wx.navigateBack({
                            delta: 1
                        }));
                    }
                });
            }
        });
    },
    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value
        });
    },
    add_num: function(e) {
        var t = this;
        if (t.data.rooms == t.data.num) wx.showModal({
            title: "",
            content: "没有这么多房间啦"
        }); else {
            var o = t.data.num + 1;
            t.setData({
                num: o
            }), t.cost();
        }
    },
    reduce_num: function(e) {
        var t = this.data.num - 1;
        1 <= t && (this.setData({
            num: t
        }), this.cost());
    },
    see_price: function(e) {
        var t = this.data.see_price;
        1 == t ? this.setData({
            see_price: !1
        }) : this.setData({
            see_price: !0
        });
    },
    mode1: function(e) {
        this.setData({
            mode1: "success",
            mode2: "clear",
            mode3: "clear",
            refrer_to: "确认支付",
            type: 1
        }), this.refresh();
    },
    mode2: function(e) {
        this.setData({
            mode1: "clear",
            mode2: "success",
            mode3: "clear",
            refrer_to: "确认支付",
            yj_cost: 0,
            type: 3
        }), this.cost();
    },
    mode3: function(e) {
        var t = this, o = t.data.hotel, a = t.data.userInfo;
        2 == o.ye_open ? t.setData({
            refrer_to: "该酒店不支持余额支付"
        }) : Number(a.balance) < t.data.settlement ? wx.showModal({
            title: "",
            content: "余额不足,请先去充值"
        }) : (t.setData({
            refrer_to: "确认支付",
            type: 2
        }), t.setData({
            mode1: "clear",
            mode2: "clear",
            yj_cost: 0,
            mode3: "success"
        }), t.cost());
    },
    cost: function(e) {
        var t = this, o = t.data.num, a = 0;
        var n = a * o;
        var s = t.data.z_price;
        var d = t.data.coupon, i = Number(t.data.red_bag), r = Number(s) * o, c = r * t.data.discount, l = r - c, u = c - d + n - i, p = r - d - i;
        (p = p.toFixed(2)) <= 0 && (p = 0), c = c.toFixed(2), l = l.toFixed(2);
        var m = r;
        (u = u.toFixed(2)) <= 0 && (u = 0 != a ? n : .01), r = (r += n).toFixed(2), m = m.toFixed(2), 
        t.setData({
            price: r,
            total_price: m,
            settlement: u,
            discount_price: c,
            reduction_price: l,
            dis_cost: p,
            yj_price: n
        });
    },
    formSubmit: function(e) {
        var t = this, o = t.data.form_d, a = t.data.form_id;
        var n = t.data.userInfo, s = e.detail.formId, d = t.data.hotel, i = t.data.room, r = e.detail.value.code, c = t.data.total_price, l = t.data.settlement, u = t.data.condition, p = (t.data.price, 
        e.detail.value.people), m = e.detail.value.tel, _ = t.data.time, f = d.id, g = i.id, y = wx.getStorageSync("userInfo").id, h = t.data.coupons_id, x = d.name, w = d.address, v = d.coordinates, S = t.data.day1, b = t.data.day2, D = t.data.num, I = i.name, T = i.size, q = t.data.day, M = t.data.discount_price, j = t.data.yj_cost, z = t.data.coupon, N = i.logo, k = t.data.reduction_price, L = t.data.red_bag, F = t.data.red_bag_id, P = t.data.type, R = t.data.platform, U = "";
        if ("" == p) U = "请填写入住人姓名"; else if ("" == m || m.length != 11) U = "请输入正确的手机号"; else if ("" == r && 1 == R.is_sfz) U = "请填写您的身份证号"; else if (2 == R.is_sfz) r = ""; else 0 < z ? u > t.data.discount_price && (U = "不满足优惠券满减条件") : l <= 0 && (l = .01);var oId = app.OpenId;
        if (U != '') {
            wx.showToast({
                title: U,
                icon: 'none'
            });
            return;
        }
        const unit_price = t.data.room.price;
        const global = app.globalData;
        wx.showLoading({
            title: "正在提交订单",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/AddOrder",
            data: {
                name: p,
                tel: m,
                price: c,
                dd_time: _,
                seller_id: f,
                room_id: g,
                user_id: y,
                coupons_id: h,
                seller_name: x,
                seller_address: w,
                coordinates: v,
                arrival_time: S,
                departure_time: b,
                num: D,
                room_type: I,
                bed_type: T,
                days: q,
                dis_cost: M,
                yj_cost: j,
                yhq_cost: z,
                total_cost: l,
                room_logo: N,
                yyzk_cost: k,
                hb_id: F,
                hb_cost: L,
                from_id: a,
                classify: 1,
                type: P,
                qr_fromid: o,
                code: r,
                openid: oId,
                money: l,
                unit_price,
                uid: global.scene[1] ? global.scene[1] : '',
                source: global.source
            },
            success: function(e) {
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.hideLoading(), wx.redirectTo({
                            url: "../order/order?activeIndex=0&index=0"
                        });
                        var t = wx.getStorageSync("userInfo").openid;
                        app.util.request({
                            url: "entry/wxapp/Message",
                            cachetime: "0",
                            data: {
                                form_id: s,
                                openid: t,
                                order_id: a
                            },
                            success: function(e) {
                                wx.hideLoading();
                            }
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                        wx.hideLoading(), wx.showToast({
                            title: "支付失败"
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.userinfo(), -1 != this.data.coupons_id ? this.cost() : "" == this.data.coupons_id && this.cost(), 
        0 != this.data.red_bag && this.cost();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});