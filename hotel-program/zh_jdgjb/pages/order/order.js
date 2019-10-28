var app = getApp();

Page({
    data: {
        titel: [ "全部", "待付款", "待入住" ],
        page: 1,
        activeIndex: 0,
        order_list: []
    },
    onLoad: function(e) {
        var t = this;
        app.getUrl(t), app.getSystem(t);
        var a = e.activeIndex, r = e.index;
        t.setData({
            activeIndex: a,
            index: r
        }), t.refresh();
    },
    refresh: function(e) {
        var o = this, i = o.data.page, n = o.data.order_list, s = o.data.index;
        var t = wx.getStorageSync("userInfo").id, a = app.today_time();
        app.util.request({
            url: "entry/wxapp/MyOrder",
            cachetime: "0",
            data: {
                user_id: t,
                page: i
            },
            success: function(e) {
                if (0 < e.data.length) {
                    o.setData({
                        page: i + 1
                    }), n = n.concat(e.data);
                    var t = [], a = [];
                    for (var r in n) n[r].arrival_time = n[r].arrival_time.slice(5, 7) + "月" + n[r].arrival_time.slice(8, 10) + "日", 
                    n[r].departure_time = n[r].departure_time.slice(5, 7) + "月" + n[r].departure_time.slice(8, 10) + "日", 
                    1 == n[r].status && t.push(n[r]), 2 == n[r].status && a.push(n[r]);
                    0 == s ? o.setData({
                        order_list: n
                    }) : 1 == s ? o.setData({
                        order_list: t
                    }) : 2 == s && o.setData({
                        order_list: a
                    });
                }
            }
        });
    },
    tabClick: function(e) {
        this.setData({
            activeIndex: e.currentTarget.dataset.index,
            index: e.currentTarget.dataset.index,
            page: 1,
            order_list: []
        }), this.refresh();
    },
    order_info: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "orderinfo?id=" + t
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            page: 1,
            order_list: []
        }), this.refresh();
    },
    onHide: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            order_list: []
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.refresh();
    },
    onShareAppMessage: function() {}
});