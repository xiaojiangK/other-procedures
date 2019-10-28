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
        active: 0,
        list: [],
        style: {},
        params: {}
    },
    methods: {
        tabsChange(e) {
            this.setData({ active: e.currentTarget.dataset.idx });
            this.triggerEvent('tabs', e.currentTarget.dataset.id);
        }
    }
});