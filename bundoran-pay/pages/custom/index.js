//Page Object
var t = getApp(),
a = t.requirejs("core");

Page({
    data: {
        background: '',
        widgetsData: []
    },
    onLoad() {
        a.post("/app/ewei_shopv2_api.php", {
            i: 1,
            c: "site",
            a: "entry",
            m: "Lewei_shopv2",
            do: "web",
            r: "wxrelease.get_page"
        }, (t) => {
            if (t.shop_custom) {
                const custom = t.shop_custom;
                const param = custom[custom.length - 1].param;
                wx.setNavigationBarTitle({
                    title: param.title
                });
                wx.setNavigationBarColor({
                    frontColor: param.titlebarcolor,
                    backgroundColor: param.titlebarbg,
                    animation: {
                        duration: 400,
                        timingFunc: 'easeIn'
                    }
                });
                this.setData({
                    widgetsData: custom,
                    background: param.background
                });
            }
        }, true);
    }
});