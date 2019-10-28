var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), app.util.request({
            url: "entry/wxapp/attachurl",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url", t.data), a.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/PjDetails",
            cachetime: "0",
            data: {
                seller_id: t.seller_id
            },
            success: function(t) {
                t.data.img = t.data.img.split(","), a.setData({
                    hotel: t.data
                });
            }
        });
    },
    phone: function(t) {
        wx.makePhoneCall({
            phoneNumber: this.data.hotel.tel
        });
    },
    dizhi: function(t) {
        var a = this, e = Number(a.data.hotel.coordinates.split(",")[0]), o = Number(a.data.hotel.coordinates.split(",")[1]);
        wx.openLocation({
            latitude: e,
            longitude: o,
            name: a.data.hotel.name,
            address: a.data.hotel.address
        });
    },
    previewImage: function(t) {
        var a = this.data.url, e = [], o = t.currentTarget.dataset.index;
        var n = this.data.hotel.img;
        for (var i in n) e.push(a + n[i]);
        wx.previewImage({
            current: a + n[o],
            urls: e
        });
    },
    setclip: function() {
        wx.setClipboardData({
            data: this.data.hotel.name,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});