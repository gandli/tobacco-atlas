const { getFavoriteIds } = require("../../utils/favorites");
const { getProductsByIds } = require("../../utils/catalog");
const { toggleFavorite } = require("../../utils/favorites");

Page({
  data: {
    products: [],
    count: 0,
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const ids = getFavoriteIds();
    const products = getProductsByIds(ids).map((p) => ({
      ...p,
      categoryLabel: p.category === "cigarette" ? "卷烟" : p.category === "cigar" ? "雪茄" : "电子烟",
    }));
    this.setData({ products, count: products.length });
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/product-detail/product-detail?id=${encodeURIComponent(id)}` });
  },

  goBrands() {
    wx.switchTab({ url: "/pages/brands/brands" });
  },

  removeFav(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    toggleFavorite(id);
    this.refresh();
    wx.showToast({ title: "已移除", icon: "none" });
  },
});
