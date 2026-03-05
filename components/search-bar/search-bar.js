Component({
  properties: {
    placeholder: {
      type: String,
      value: "搜索品牌 / 产品…",
    },
  },
  methods: {
    onTap() {
      wx.navigateTo({ url: "/pages/search/search" });
    },
  },
});

