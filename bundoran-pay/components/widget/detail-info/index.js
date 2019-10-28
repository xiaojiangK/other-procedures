//Component Object
var t = getApp();

Component({
    properties: {
        data:{
            type: Object,
            observer: function(newVal, oldVal) {
                this.setData({
                    style: newVal.style,
                    params: newVal.params
                });
            }
        },
        goods: {
            type: Object,
            value: {}
        }
    },
    data: {
        style: {},
        params: {},
        icons: t.requirejs("icons"),
        now: parseInt(Date.now() / 1000)
    },
    methods: {
        cityPicker() {
            wx.navigateTo({
                url: "/pages/goods/region/index?id=" + this.data.goods.id + "&region=" + this.data.goods.edareas
            });
        }
    }
});