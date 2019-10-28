//Component Object
Component({
    properties: {
        data:{
            type: Object,
            observer: function(newVal, oldVal) {
                const pa = newVal.params;
                let openType = 'navigate';
                if (pa.rightnavlink == '/pages/index/index' || pa.rightnavlink == '/pages/shop/caregory/index' || pa.rightnavlink == '/pages/commission/index' || pa.rightnavlink == '/pages/member/cart/index' || pa.rightnavlink == '/pages/member/index/index') {
                    openType = 'switchTab';
                }
                const params = {
                    ...pa,
                    openType
                }
                this.setData({
                    params,
                    style: newVal.style,
                    lefticon: newVal.params.leftnavicon.split('-'),
                    righticon: newVal.params.rightnavicon.split('-')
                });
            }
        }
    },
    data: {
        style: {},
        params: {},
        lefticon: [],
        righticon: []
    },
    methods: {
        search() {
            wx.navigateTo({
                url: '/pages/goods/index/index?fromsearch=1'
            });
        }
    }
});