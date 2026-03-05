const { getLang, setLang } = require("../../utils/i18n");

Page({
  data: {
    version: "0.1.0",
    langOptions: [
      { key: "zh", label: "中文" },
      { key: "en", label: "English" },
    ],
    langIndex: 0,
  },

  onLoad() {
    const app = getApp();
    const version = (app && app.globalData && app.globalData.version) || "0.1.0";
    const lang = getLang();
    const idx = this.data.langOptions.findIndex((o) => o.key === lang);
    this.setData({ version, langIndex: idx >= 0 ? idx : 0 });
  },

  onLangChange(e) {
    const idx = Number(e.detail.value || 0);
    const opt = this.data.langOptions[idx] || this.data.langOptions[0];
    setLang(opt.key);
    this.setData({ langIndex: idx });
    wx.showToast({ title: opt.key === "en" ? "Language set" : "已切换语言", icon: "none" });
  },
});

