const { getProductsByCategory, getCatalogStats } = require("../../utils/catalog");
const { isFavorite, toggleFavorite } = require("../../utils/favorites");

Page({
  data: {
    activeCategory: "cigarette",
    products: [],
    statsText: "",
    heroProducts: [],
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
    this.refreshHero();
    this.loadList(this.data.activeCategory);
  },

  refreshHero() {
    const list = [
      ...getProductsByCategory("cigarette").slice(0, 6),
      ...getProductsByCategory("cigar").slice(0, 6),
      ...getProductsByCategory("ecig").slice(0, 6),
    ].slice(0, 14);
    this.setData({ heroProducts: list });
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
