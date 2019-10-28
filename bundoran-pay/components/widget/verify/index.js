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
        style: {},
        params: {}
    },
    methods: {
        
    }
});