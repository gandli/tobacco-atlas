const STORAGE_KEY = "theme";

function getTheme() {
  return "light";
}

function setTheme() {
  wx.setStorageSync(STORAGE_KEY, "light");
  return "light";
}

function getThemeClass() {
  return "";
}

module.exports = { STORAGE_KEY, getTheme, setTheme, getThemeClass };
