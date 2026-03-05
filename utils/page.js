const { getTheme, getThemeClass } = require("./theme");

function applyTheme(page) {
  if (!page || typeof page.setData !== "function") return;
  page.setData({ themeClass: getThemeClass() });

  const theme = getTheme();
  const frontColor = theme === "light" ? "#000000" : "#000000";
  const backgroundColor = theme === "light" ? "#ffffff" : "#ffffff";
  wx.setNavigationBarColor({
    frontColor,
    backgroundColor,
    animation: { duration: 180, timingFunc: "easeInOut" },
  });
}

function playEnterAnimation(page, animKey) {
  if (!page || typeof page.setData !== "function") return;
  const key = String(animKey || "slide-left");
  const animation = wx.createAnimation({ duration: 240, timingFunction: "ease-out" });

  if (key === "fade") {
    animation.opacity(0).step({ duration: 0 });
    animation.opacity(1).step();
  } else if (key === "slide-up") {
    animation.opacity(0).translateY(24).step({ duration: 0 });
    animation.opacity(1).translateY(0).step();
  } else {
    animation.opacity(0).translateX(28).step({ duration: 0 });
    animation.opacity(1).translateX(0).step();
  }

  page.setData({ enterAnim: animation.export() });
}

function initPage(page, options) {
  applyTheme(page);
  const anim = options && options.__anim ? String(options.__anim) : "slide-left";
  playEnterAnimation(page, anim);
}

module.exports = { applyTheme, playEnterAnimation, initPage };
