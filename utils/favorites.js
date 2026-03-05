const STORAGE_KEY = "favorites";

function getFavoriteIds() {
  const raw = wx.getStorageSync(STORAGE_KEY);
  if (Array.isArray(raw)) return raw.filter(Boolean);
  return [];
}

function setFavoriteIds(ids) {
  const unique = Array.from(new Set((ids || []).filter(Boolean)));
  wx.setStorageSync(STORAGE_KEY, unique);
  return unique;
}

function isFavorite(productId) {
  const ids = getFavoriteIds();
  return ids.includes(productId);
}

function toggleFavorite(productId) {
  const ids = getFavoriteIds();
  const idx = ids.indexOf(productId);
  if (idx >= 0) {
    ids.splice(idx, 1);
  } else {
    ids.unshift(productId);
  }
  return setFavoriteIds(ids);
}

module.exports = {
  STORAGE_KEY,
  getFavoriteIds,
  setFavoriteIds,
  isFavorite,
  toggleFavorite,
};

