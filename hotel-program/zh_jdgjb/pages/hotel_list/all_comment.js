var app = getApp();

Page({
    data: {
        assess_list: [],
        page: 1
    },
    onLoad: function(a) {
        var e = this;
        app.getUrl(e), app.getSystem(e), e.setData({
            seller_id: a.seller_id
        }), e.refresh();
    },
    refresh: function(a) {
        var t = this, e = t.data.seller_id, s = t.data.assess_list, i = t.data.page;
        app.util.request({
            url: "entry/wxapp/AssessList",
            cachetime: "0",
            data: {
                seller_id: e,
                page: i
            },
            success: function(a) {
                if (0 < a.data.length) {
                    for (var e in t.setData({
                        page: i + 1,
                        none_more: !1
                    }), s = s.concat(a.data), a.data) a.data[e].img = a.data[e].img.split(","), a.data[e].time = app.ormatDate(a.data[e].time).slice(0, 10);
                    t.setData({
                        assess_list: s
                    });
                } else t.setData({
                    none_more: !0
                });
            }
        });
    },
    previewImage: function(a) {
        var e = this.data.url, t = [], s = a.currentTarget.id, i = a.currentTarget.dataset.index, n = this.data.assess_list;
        for (var r in n) if (s == n[r].id) var o = n[r].img;
        for (var l in o) t.push(e + o[l]);
        wx.previewImage({
            current: e + o[i],
            urls: t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            assess_list: [],
            page: 1
        }), this.refresh();
    },
    onReachBottom: function() {
        this.refresh();
    }
});