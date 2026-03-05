const { products } = require("../data/products");

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function getAllProducts() {
  return products.slice();
}

function getCatalogStats() {
  let cigarette = 0;
  let cigar = 0;
  let ecig = 0;
  products.forEach((p) => {
    if (p.category === "cigarette") cigarette += 1;
    else if (p.category === "cigar") cigar += 1;
    else if (p.category === "ecig") ecig += 1;
  });
  return { cigarette, cigar, ecig };
}

function getProductsByCategory(categoryKey) {
  return products
    .filter((p) => p.category === categoryKey)
    .sort((a, b) => (a.brand + a.name).localeCompare(b.brand + b.name, "zh-Hans-CN"));
}

function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

function getProductsByIds(ids) {
  const list = (ids || []).filter(Boolean);
  const map = new Map(products.map((p) => [p.id, p]));
  const out = [];
  list.forEach((id) => {
    const p = map.get(id);
    if (p) out.push(p);
  });
  return out;
}

function searchProducts(query) {
  const q = normalizeText(query);
  if (!q) return [];
  return products
    .filter((p) => {
      const hay = normalizeText(
        [
          p.category,
          p.brand,
          p.name,
          p.series,
          p.type,
          p.origin,
          p.desc,
          p.size,
          p.wrapper,
          p.features,
        ]
          .filter(Boolean)
          .join(" ")
      );
      return hay.includes(q);
    })
    .slice(0, 60);
}

function categoryLabel(category) {
  if (category === "cigarette") return "卷烟";
  if (category === "cigar") return "雪茄";
  if (category === "ecig") return "电子烟";
  return "产品";
}

module.exports = {
  getAllProducts,
  getCatalogStats,
  getProductsByCategory,
  getProductById,
  getProductsByIds,
  searchProducts,
  categoryLabel,
};
