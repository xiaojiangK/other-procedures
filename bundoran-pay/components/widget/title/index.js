//Component Object
Component({
    properties: {
        data:{
            type: Object,
            observer: function(newVal, oldVal) {
                this.setData({
                    style: newVal.style,
                    params: newVal.params,
                    iconClass: newVal.params.icon.split('-')
                });
            }
        }
    },
    data: {
        style: {},
        params: {},
        iconClass: []
    },
    methods: {
        
    }
});