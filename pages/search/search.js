const { searchProducts, categoryLabel } = require("../../utils/catalog");

Page({
  data: {
    query: "",
    results: [],
    count: 0,
  },

  onLoad(options) {
    const q = options && options.q ? String(options.q) : "";
    if (q) {
      this.setData({ query: q });
      this.doSearch(q);
    }
  },

  onInput(e) {
    this.setData({ query: e.detail.value || "" });
  },

  onSearch() {
    this.doSearch(this.data.query);
  },

  doSearch(query) {
    const results = searchProducts(query).map((p) => ({
      ...p,
      categoryLabel: categoryLabel(p.category),
    }));
    this.setData({ results, count: results.length });
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/product-detail/product-detail?id=${encodeURIComponent(id)}` });
  },
});

