//Component Object
Component({
    properties: {
        data:{
            type: Object,
            observer: function(newVal, oldVal) {
                const list = newVal.data.map(item => {
                    let openType = 'navigate';
                    if (item.linkurl == '/pages/index/index' || item.linkurl == '/pages/shop/caregory/index' || item.linkurl == '/pages/commission/index' || item.linkurl == '/pages/member/cart/index' || item.linkurl == '/pages/member/index/index') {
                        openType = 'switchTab';
                    }
                    return {
                        ...item,
                        openType,
                        iconclass: item.iconclass.split('-')
                    }
                });
                this.setData({
                    list,
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
        
    }
});