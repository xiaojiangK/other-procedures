//Component Object
var t = getApp(),
  c = t.requirejs("core");

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
        goods: {
            type: Object,
            value: {}
        }
    },
    data: {
        style: {},
        params: {},
        list: []
    },
    methods: {
        
    },
    ready() {
        c.post("/app/ewei_shopv2_api.php", {
            page: 1,
            type: 'cate',
            pagesize: 2,
            cateid: this.data.goods.cateid,
            r: 'shop.get_goods'
        }, (e) => {
            this.setData({ list: e.list });
        });
    }
});