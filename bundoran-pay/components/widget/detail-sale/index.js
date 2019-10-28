//Component Object
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
        params: {}
    },
    methods: {
        cityPicker() {
            wx.navigateTo({
                url: "/pages/goods/region/index?id=" + this.data.goods.id + "&dispatch=" + this.data.goods.dispatchcitys
            });
        }
    }
});