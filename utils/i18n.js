const STORAGE_KEY = "lang";

function getLang() {
  const lang = wx.getStorageSync(STORAGE_KEY);
  return lang === "en" ? "en" : "zh";
}

function setLang(lang) {
  wx.setStorageSync(STORAGE_KEY, lang === "en" ? "en" : "zh");
}

module.exports = { getLang, setLang };

