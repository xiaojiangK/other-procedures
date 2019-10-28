//Component Object
var e = getApp(),
  core = e.requirejs("core");

Component({
    properties: {
        data:{
            type: Object,
            observer: function(newVal, oldVal) {
                const style = newVal.style;
                const params = newVal.params;
                if (params.goodsdata > '0') {
                    let type = '';
                    let cateid = 1;
                    let groupid = '';
                    if (params.goodsdata == '1') {
                        type = 'cate';
                        cateid = params.cateid;
                    } else if (params.goodsdata == '2') {
                        cateid = '';
                        type = 'group';
                        groupid = params.groupid;
                    } else if (params.goodsdata == '3') {
                        type = 'isnew';
                    } else if (params.goodsdata == '4') {
                        type = 'ishot';
                    } else if (params.goodsdata == '5') {
                        type = 'isrecommand';
                    } else if (params.goodsdata == '6') {
                        type = 'isdiscount';
                    } else if (params.goodsdata == '7') {
                        type = 'issendfree';
                    } else if (params.goodsdata == '8') {
                        type = 'istime';
                    }
                    core.post("/app/ewei_shopv2_api.php", {
                        type,
                        cateid,
                        groupid,
                        page: 1,
                        goodssort: params.goodssort,
                        pagesize: params.goodsnum,
                        r: 'shop.get_goods'
                    }, (e) => {
                        this.setData({
                            style,
                            params,
                            list: e.list
                        });
                    });
                    return;
                }
                this.setData({
                    style,
                    params,
                    list: newVal.data
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
        goBuy(e) {
            wx.navigateTo({
                url: `/pages/goods/detail/index?id=${e.currentTarget.dataset.id}`
            });
        }
    }
});