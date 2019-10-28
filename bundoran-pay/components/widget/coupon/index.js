//Component Object
Component({
    properties: {
        data:{
            type: Object,
            observer: function(newVal, oldVal) {
                this.setData({
                    list: newVal.data,
                    style: newVal.style,
                    params: newVal.params
                });
            }
        }
    },
    data: {
        list: [],
        style: {},
        params: {}
    },
    methods: {
        goCoupon(e) {
            wx.navigateTo({
                url: `/pages/sale/coupon/detail/index?id=${e.currentTarget.dataset.id}`
            });
        }
    }
});