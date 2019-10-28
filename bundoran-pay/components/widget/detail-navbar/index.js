//Component Object
var t = getApp(),
core = t.requirejs("core");

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
        isfavorite: false
    },
    methods: {
        favorite() {
            const goods = this.data.goods;
            const o = this.data.isfavorite ? 0 : 1;
            core.get("member/favorite/toggle", {
                id: goods.id,
                isfavorite: o
            }, (e) => {
                this.setData({
                    isfavorite: e.isfavorite ? true : false
                });
            });
        },
        goBuy(e) {
            this.triggerEvent('goBuy', e.currentTarget.dataset.type);
        }
    },
    ready() {
        if (this.data.goods.isfavorite) {
            this.setData({
                isfavorite: true
            });
        }
    }
});