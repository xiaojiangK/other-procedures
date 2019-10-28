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
        }
    },
    data: {
        list: ['主会场','手机','家电','母婴','女装','男装','潮装','老年装','童装'],
        style: {},
        params: {},
        active: 0
    },
    methods: {
        hallSelect(e) {
            const active = e.currentTarget.dataset.idx;
            this.setData({ active });
            this.triggerEvent('hallSelect', this.data.list[active]);
        }
    }
});