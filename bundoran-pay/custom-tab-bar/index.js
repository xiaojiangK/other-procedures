var e = getApp(),
  r = e.requirejs("core");

Component({
  data: {
    selected: 0,
    color: "#999999",
    background: "#ffffff",
    selectedColor: "#ff0011",
    borderStyle: "rgba(0, 0, 0, 0.33)",
    list: []
  },
  attached() {
    var that = this;
    r.get("wxrelease.getTabbar", {}, function (res) {
      that.setData({
        list: res.list,
        color: res.color,
        borderStyle: res.borderStyle,
        background: res.backgroundColor,
        selectedColor: res.selectedColor
      });
    });
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
});