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
        comment: {
            type: Object,
            value: {}
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
        
    }
});