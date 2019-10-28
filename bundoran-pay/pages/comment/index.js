var t = getApp(),
  e = t.requirejs("core"),
  o = t.requirejs("biz/diyform");
Page({
  data: {
    goods: {},
    commentObj: {},
    commentObjTab: 1,
    loading: false,
    commentEmpty: false,
    commentPage: 1,
    commentList: []
  },
  comentTap: function (t) {
    var a = this,
      o = t.currentTarget.dataset.type,
      i = "";
    1 == o ? i = "all" : 2 == o ? i = "good" : 3 == o ? i = "normal" : 4 == o ? i = "bad" : 5 == o && (i = "pic"),
      o != a.data.commentObjTab && e.get("goods/get_comment_list", {
        id: a.data.options.id,
        level: i,
        page: a.data.commentPage
      }, function (t) {
        t.list.length > 0 ? a.setData({
          loading: false,
          commentList: t.list,
          commentPage: t.page,
          commentObjTab: o,
          commentEmpty: false
        })
          : a.setData({
            loading: false,
            commentList: t.list,
            commentPage: t.page,
            commentObjTab: o,
            commentEmpty: true
          })
      })
  },
  getDetail: function (t) {
    var a = this;
    a.setData({
      loading: true
    }),
    e.get("goods/get_detail", {
        id: t.id
    }, function (t) {
        t.goods.getComments > 0 && e.get("goods/get_comments", {
            id: a.data.options.id
        }, function (t) {
            a.setData({
                loading: false,
                commentObj: t,
                commentList: t.list,
                commentEmpty: t.count.all == 0 ? true : false
            });
        });
    });
  },
  onLoad: function (e) {
    var a = this;
    "" == t.getCache("userinfo") && wx.redirectTo({
      url: "/pages/message/auth/index"
    }),
      a.setData({
        options: e
      }),
      this.getDetail(e)
  }
})