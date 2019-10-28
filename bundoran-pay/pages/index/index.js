//index.js
var t = getApp(),
  a = t.requirejs("core"),
  e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({
  data: {
    route: "home",
    icons: t.requirejs("icons"),
    shop: {},
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    storeRecommand: [],
    total: 0,
    page: 1,
    loaded: false,
    loading: true,
    indicatorDotsHot: false,
    autoplayHot: true,
    intervalHot: 5000,
    durationHOt: 1000,
    circularHot: true,
    hotimg: "/static/images/hotdot.jpg",
    notification: "/static/images/notification.png",
    isAuthorize: false,
    widgetsData: [],
    background: ''
  },
  getShop: function () {
    var t = this;
    a.get("shop/get_shopindex", {}, function (a) {
      //console.log('shop index', a, new Date());
      e.wxParse("wxParseData", "html", a.copyright, t, "5"),
        t.setData({
          shop: a
        })
    })
  },
  bindGetUserInfo: function (ev) {
    if (ev.detail.errMsg == 'getUserInfo:ok') {
      var e = t.getCache("userinfo");
      var that = this;
      ("" == e || e.needauth) && t.getUserInfo(function (e) {
        that.setData({
          isAuthorize: true
        });
      }, function (e, t) {
        var t = t ? 1 : 0,
          e = e || "";
        //页面重定向
        t && wx.redirectTo({
          url: "/pages/message/auth/index?close=" + t + "&text=" + e
        });
      })
    }
  },
  onReachBottom: function () {
    this.data.loaded || this.data.storeRecommand.length == this.data.total || this.getRecommand()
  },
  getRecommand: function () {
    var t = this;
    t.setData({
      loading: true
    }),
      a.get("shop/get_recommand", {
        page: t.data.page
      }, function (a) {
        var e = {
          loading: false,
          total: a.total
        };
        t.setData({
          loading: false,
          total: a.total,
          show: true
        }),
          a.list || (a.list = []),
          a.list.length > 0 && (t.setData({
            storeRecommand: t.data.storeRecommand.concat(a.list),
            page: a.page + 1
          }), a.list.length < a.pagesize && (e.loaded = true))
      })
  },
  getWidget() {
    a.post("/app/ewei_shopv2_api.php", {
      i: 1,
      c: "site",
      a: "entry",
      m: "Lewei_shopv2",
      do: "web",
      r: "wxrelease.get_page"
    }, (t) => {
      if (t.shop_index) {
        const index = t.shop_index;
        const param = index[index.length - 1].param;
        wx.setNavigationBarTitle({
          title: param.title
        });
        wx.setNavigationBarColor({
          frontColor: param.titlebarcolor,
          backgroundColor: param.titlebarbg,
          animation: {
            duration: 400,
            timingFunc: 'easeIn'
          }
        });
        this.setData({
          widgetsData: index,
          background: param.background
        });
      }
    }, true);
  },
  onLoad: function (e) {
    t.url(e)
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }
    var a = t.getCache("sysset");
    wx.setNavigationBarTitle({
      title: a.shopname || "商城首页"
    });
    this.getShop();
    if (t.getCache("userinfo")) {
      this.setData({
        isAuthorize: true
      });
    } else {
      wx.showToast({
        title: '请点击任意位置授权微信信息',
        icon: 'none'
      });
    }
    this.getWidget();
    this.getRecommand();
  },
  onShareAppMessage: function () {
    return a.onShareAppMessage()
  },
  imagesHeight: function (t) {
    var a = t.detail.width,
      e = t.detail.height,
      o = t.target.dataset.type,
      i = {},
      s = this;
    wx.getSystemInfo({
      success: function (t) {
        i[o] = t.windowWidth / a * e,
          (!s.data[o] || s.data[o] && i[o] < s.data[o]) && s.setData(i)
      }
    })
  }
})