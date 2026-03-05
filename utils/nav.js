function appendQuery(url, kv) {
  const [path, hash] = String(url || "").split("#");
  const joiner = path.includes("?") ? "&" : "?";
  const query = Object.entries(kv || {})
    .filter(([, v]) => v !== undefined && v !== null && String(v) !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  const next = query ? `${path}${joiner}${query}` : path;
  return hash ? `${next}#${hash}` : next;
}

function navigateTo(url, options) {
  const anim = (options && options.anim) || "slide-left";
  wx.navigateTo({ url: appendQuery(url, { __anim: anim }) });
}

function redirectTo(url, options) {
  const anim = (options && options.anim) || "fade";
  wx.redirectTo({ url: appendQuery(url, { __anim: anim }) });
}

module.exports = { navigateTo, redirectTo, appendQuery };
