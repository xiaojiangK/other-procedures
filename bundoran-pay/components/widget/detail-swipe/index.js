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
        params: {},
        currentSwiper: 0
    },
    methods: {
        swiperChange: function (e) {
            this.setData({
              currentSwiper: e.detail.current
            });
        }
    }
});