const { products } = require("../data/products");

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function categoryIcon(category) {
  if (category === "cigarette") return "/assets/icons/cigarette-pack.svg";
  if (category === "cigar") return "/assets/icons/cigar.svg";
  if (category === "ecig") return "/assets/icons/ecig-device.svg";
  return "/assets/icons/cigarette-pack.svg";
}

function displayName(p) {
  if (p && p.name) return String(p.name);
  const brand = String((p && p.brand) || "").trim();
  const series = String((p && p.series) || "").trim();
  const suffix = series ? ` ${series}` : "";
  return (brand + suffix).trim() || "未命名产品";
}

function decorateProduct(p) {
  if (!p) return null;
  return {
    ...p,
    name: displayName(p),
    icon: categoryIcon(p.category),
  };
}

function getAllProducts() {
  return products.map(decorateProduct);
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
    .map(decorateProduct)
    .sort((a, b) => (a.brand + a.name).localeCompare(b.brand + b.name, "zh-Hans-CN"));
}

function getProductById(id) {
  return decorateProduct(products.find((p) => p.id === id) || null);
}

function getProductsByIds(ids) {
  const list = (ids || []).filter(Boolean);
  const map = new Map(products.map((p) => [p.id, p]));
  const out = [];
  list.forEach((id) => {
    const p = map.get(id);
    if (p) out.push(decorateProduct(p));
  });
  return out;
}

function searchProducts(query) {
  const q = normalizeText(query);
  if (!q) return [];
  return products
    .filter((p) => {
      const dp = decorateProduct(p);
      const hay = normalizeText(
        [
          dp.category,
          dp.brand,
          dp.name,
          dp.series,
          dp.type,
          dp.origin,
          dp.desc,
          dp.size,
          dp.wrapper,
          dp.features,
        ]
          .filter(Boolean)
          .join(" ")
      );
      return hay.includes(q);
    })
    .map(decorateProduct)
    .slice(0, 60);
}

function categoryLabel(category) {
  if (category === "cigarette") return "卷烟";
  if (category === "cigar") return "雪茄";
  if (category === "ecig") return "电子烟";
  return "产品";
}

function getProductsByBrand(brand) {
  const b = String(brand || "").trim();
  if (!b) return [];
  return products
    .filter((p) => String(p.brand || "").trim() === b)
    .map(decorateProduct)
    .sort((a, b2) => (a.name + a.id).localeCompare(b2.name + b2.id, "zh-Hans-CN"));
}

function getBrandsByCategory(categoryKey) {
  const map = new Map();
  products.forEach((p) => {
    if (p.category !== categoryKey) return;
    const brand = String(p.brand || "").trim();
    if (!brand) return;
    map.set(brand, (map.get(brand) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => a.brand.localeCompare(b.brand, "zh-Hans-CN"));
}

module.exports = {
  getAllProducts,
  getCatalogStats,
  getProductsByCategory,
  getProductsByBrand,
  getBrandsByCategory,
  getProductById,
  getProductsByIds,
  searchProducts,
  categoryLabel,
  categoryIcon,
};
