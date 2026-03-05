const { getProductById, categoryLabel } = require("../../utils/catalog");
const { isFavorite, toggleFavorite } = require("../../utils/favorites");

Page({
  data: {
    id: "",
    product: null,
    isFav: false,
    categoryLabel: "",
  },

  onLoad(options) {
    const id = options && options.id ? String(options.id) : "";
    this.setData({ id });
    this.load(id);
  },

  onShow() {
    if (!this.data.id) return;
    this.setData({ isFav: isFavorite(this.data.id) });
  },

  load(id) {
    const product = getProductById(id);
    if (!product) {
      this.setData({ product: null, isFav: false, categoryLabel: "" });
      return;
    }

    this.setData({
      product,
      isFav: isFavorite(product.id),
      categoryLabel: categoryLabel(product.category),
    });
    wx.setNavigationBarTitle({ title: product.name });
  },

  toggleFav() {
    if (!this.data.id) return;
    const next = toggleFavorite(this.data.id);
    const fav = next.includes(this.data.id);
    this.setData({ isFav: fav });
    wx.showToast({ title: fav ? "已收藏" : "已取消", icon: "none" });
  },

  goBack() {
    wx.navigateBack();
  },
});

