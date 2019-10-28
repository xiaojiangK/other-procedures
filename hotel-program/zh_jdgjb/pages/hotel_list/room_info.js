var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = this;
        app.getUrl(t), app.getSystem(t);
        a.hotel_id;
        var e = a.room_id, o = (new Date().toLocaleDateString().replace(/\//g, "-"), a.coordinates), n = a.tel, i = a.address, s = a.name, r = a.price;
        t.setData({
            tel: n,
            coordinates: o,
            address: i,
            name: s,
            price: r
        }), app.util.request({
            url: "entry/wxapp/RoomDetails",
            cachetime: "0",
            data: {
                room_id: e
            },
            success: function(a) {
                "" != a.data.img && (a.data.img = a.data.img.split(",")), 
                t.setData({
                    room: a.data
                });
            }
        });
    },
    phone: function(a) {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
        });
    },
    dizhi: function(a) {
        var t = this, e = Number(t.data.coordinates.split(",")[0]), o = Number(t.data.coordinates.split(",")[1]);
        wx.openLocation({
            latitude: e,
            longitude: o,
            name: t.data.name,
            address: t.data.address
        });
    },
    previewImage: function(a) {
        var t = this.data.url, e = [], o = a.currentTarget.dataset.index;
        var n = this.data.room.img;
        for (var i in n) e.push(t + n[i]);
        wx.previewImage({
            current: t + n[o],
            urls: e
        });
    },
    setclip: function() {
        wx.setClipboardData({
            data: this.data.room.name,
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {
                        console.log(a.data);
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