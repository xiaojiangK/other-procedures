var e = getApp();
e.requirejs("core"),
  e.requirejs("jquery");
Page({
  data: {
    type: '',
    region: []
  },
  onLoad: function (e) {
    var r = this;
    if (e.region) {
      r.setData({
        type: 'region',
        region: e.region
      });
    } else {
      r.setData({
        type: 'dispatch',
        region: e.dispatch
      });
    }
  }
})