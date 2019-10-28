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
        list: [{
            time: '18:00',
            status: '已结束'
        }, {
            time: '19:00',
            status: '抢购中'
        }, {
            time: '20:00',
            status: '即将开始'
        }, {
            time: '21:00',
            status: '即将开始'
        }, {
            time: '22:00',
            status: '即将开始'
        }, {
            time: '23:00',
            status: '即将开始'
        }, {
            time: '24:00',
            status: '即将开始'
        }],
        active: 0,
        style: {},
        params: {}
    },
    methods: {
        timerSelect(e) {
            const active = e.currentTarget.dataset.idx;
            this.setData({ active });
            this.triggerEvent('timerSelect', this.data.list[active]);
        }
    }
});