var e = getApp(),
  r = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse");
Page({
  data: {
    route: "member",
    icons: e.requirejs("icons"),
    member: {},
    widgetsData: [],
    background: '',
    isAuthorize: false
  },
  bindGetUserInfo: function (ev) {
    if (ev.detail.errMsg == 'getUserInfo:ok') {
      var u = e.getCache("userinfo");
      var that = this;
      ("" == u || u.needauth) && e.getUserInfo(function (e) {
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
  getWidget() {
    r.post("/app/ewei_shopv2_api.php", {
      i: 1,
      c: "site",
      a: "entry",
      m: "Lewei_shopv2",
      do: "web",
      r: "wxrelease.get_page"
    }, (t) => {
      if (t.shop_member) {
        const member = t.shop_member;
        const param = member[member.length - 1].param;
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
          widgetsData: member,
          background: param.background
        });
      }
    }, true);
  },
  onLoad: function (r) {
    this.getWidget();
    e.url(r)
  },
  getInfo: function () {
    var that = this;
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      });
    }
    r.get("member", {}, function (r) {
      0 != r.error ? 
      wx.showToast({
        title: '请点击任意位置授权微信信息',
        icon: 'none',
        success: () => {
          that.setData({
            show: true
          })
        }
      })
      : that.setData({
        member: r,
        show: !0
      }),
        t.wxParse("wxParseData", "html", r.copyright, that, "5")
    })
    
    if (e.getCache("userinfo")) {
      this.setData({
        isAuthorize: true
      });
    }
  },
  onShow: function () {
    this.getInfo()
  },
  onShareAppMessage: function () {
    return r.onShareAppMessage()
  }
})