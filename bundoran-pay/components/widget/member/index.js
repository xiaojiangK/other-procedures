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
        member:{
            type: Object,
            observer: function(newVal, oldVal) {
                this.setData({
                    member: newVal
                });
            }
        }
    },
    data: {
        style: {},
        params: {},
        member: {}
    },
    methods: {
        
    }
});