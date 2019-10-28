//Component Object
Component({
    properties: {
        data:{
            type: Object,
            observer: function(newVal, oldVal) {
                let imgHeight = '';
                const style = newVal.style;
                const params = newVal.params;
                if (params.row == '3') {
                    imgHeight = 250 - (style.paddingleft * 4);
                }else if (params.row == '2') {
                    imgHeight = 375 - (style.paddingleft * 4);
                } else if (params.row == '4') {
                    imgHeight = 188 - (style.paddingleft * 4);
                } 
                this.setData({
                    list: newVal.data,
                    imgHeight,
                    style,
                    params,
                });
            }
        }
    },
    data: {
        list: [],
        style: {},
        params: {},
        imgHeight: ''
    },
    methods: {
        
    }
});