const { getProductsByCategory, getCatalogStats } = require("../../utils/catalog");
const { isFavorite, toggleFavorite } = require("../../utils/favorites");

Page({
  data: {
    activeCategory: "cigarette",
    products: [],
    statsText: "",
  },

  onLoad() {
    this.refresh();
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const { cigarette, cigar, ecig } = getCatalogStats();
    this.setData({ statsText: `${cigarette + cigar + ecig} 款 · 卷烟${cigarette} / 雪茄${cigar} / 电子烟${ecig}` });
    this.loadList(this.data.activeCategory);
  },

  loadList(categoryKey) {
    const list = getProductsByCategory(categoryKey).map((p) => ({
      ...p,
      isFav: isFavorite(p.id),
    }));
    this.setData({ products: list });
  },

  onCategory(e) {
    const key = e.currentTarget.dataset.key;
    if (!key || key === this.data.activeCategory) return;
    this.setData({ activeCategory: key });
    this.loadList(key);
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/product-detail/product-detail?id=${encodeURIComponent(id)}` });
  },

  toggleFav(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    toggleFavorite(id);
    this.loadList(this.data.activeCategory);
  },
});

