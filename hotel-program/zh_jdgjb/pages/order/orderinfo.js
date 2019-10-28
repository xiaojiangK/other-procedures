var app = getApp();

Page({
    data: {
        code: !1
    },
    onLoad: function(e) {
        var a = this;
        app.getUrl(a), app.getSystem(a), app.util.request({
            url: "entry/wxapp/OrderCode",
            data: {
                order_id: e.id
            },
            success: function(e) {
                a.setData({
                    bath: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/orderdetails",
            data: {
                order_id: e.id
            },
            success: function(e) {
                var t = e.data;
                t.arrival_time = t.arrival_time.slice(5, 7) + "月" + t.arrival_time.slice(8, 10) + "日", 
                t.departure_time = t.departure_time.slice(5, 7) + "月" + t.departure_time.slice(8, 10) + "日", 
                a.setData({
                    order_info: t
                });
            }
        });
    },
    confirmorder: function(e) {
        var t = app.OpenId, a = this.data.order_info;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: t,
                price: a.price,
                order_id: a.id
            },
            success: function(e) {
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.navigateBack({
                            delta: 1
                        });
                    },
                    fail: function(e) {
                        wx.showToast({
                            title: "支付失败"
                        });
                    }
                });
            }
        });
    },
    order_more: function(e) {
        wx.navigateTo({
            url: "../hotel_list/hotel_info?hotel_id=" + this.data.order_info.seller_id + "&type=1"
        });
    },
    see_more: function(e) {
        wx.navigateTo({
            url: "../hotel_list/hotel_info?hotel_id=" + this.data.order_info.seller_id + "&type=1"
        });
    },
    cancel_order: function(e) {
        wx.showModal({
            title: '提示',
            content: '确定取消此订单吗?',
            cancelText: '取消',
            confirmText: '确定',
            success: (result) => {
                if(result.confirm){
                    var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.hb_id;
                    1 == e.currentTarget.dataset.classify ? (app.util.request({
                        url: "entry/wxapp/CancelOrder",
                        data: {
                            order_id: t,
                            hb_id: a
                        },
                        success: function(e) {
                            wx.showToast({
                                title: "订单已取消"
                            }), setTimeout(function() {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }, 1500);
                        }
                    })) : wx.showModal({
                        title: "",
                        content: "钟点房不可以取消"
                    });
                }
            }
        });
    },
    goCall: function() {
        var o = wx.getStorageSync("platform").tel;
        wx.makePhoneCall({
            phoneNumber: o
        });
    },
    apply: function(e) {
        var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.type;
        wx.showModal({
            title: "温馨提示",
            content: "是否申请退款？",
            success: function(e) {
                e.confirm ? (1 == a ? app.util.request({
                    url: "entry/wxapp/ApplyOrder",
                    data: {
                        order_id: t
                    },
                    success: function(e) {
                        wx.showToast({
                            title: "申请成功"
                        }), setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1500);
                    }
                }) : 2 == a ? app.util.request({
                    url: "entry/wxapp/YeRefund",
                    data: {
                        order_id: t
                    },
                    success: function(e) {
                        wx.showToast({
                            title: "申请成功"
                        }), setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1500);
                    }
                }) : 3 == a && wx.showModal({
                    title: "",
                    content: "到店付不支持退款"
                })) : e.cancel;
            }
        });
    },
    code: function(e) {
        var t = this, a = t.data.code;
        1 == a ? t.setData({
            code: !1
        }) : t.setData({
            code: !0
        });
    },
    sele_address: function(e) {
        var o = this.data.order_info, n = o.coordinates.split(",");
        wx.getLocation({
            type: "gcj02",
            success: function(e) {
                var t = Number(n[0]), a = Number(n[1]);
                wx.openLocation({
                    latitude: t,
                    longitude: a,
                    name: o.seller_name,
                    address: o.seller_address
                });
            }
        });
    },
    go_eveluate: function(e) {
        wx.navigateTo({
            url: "evaluate?seller_id=" + this.data.order_info.seller_id + "&order_id=" + this.data.order_info.id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});