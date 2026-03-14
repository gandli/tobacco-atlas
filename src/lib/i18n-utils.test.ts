import { describe, expect, it } from "vitest";

import { getLocalizedText, isEnglishLanguage } from "@/lib/i18n-utils";

describe("i18n utils", () => {
  it("prefers english text when the active language is english", () => {
    expect(
      getLocalizedText({
        language: "en-US",
        zh: "中文介绍",
        en: "English description",
      }),
    ).toBe("English description");
  });

  it("falls back to chinese text when english content is missing", () => {
    expect(
      getLocalizedText({
        language: "en-US",
        zh: "中文介绍",
        en: "",
      }),
    ).toBe("中文介绍");
  });

  it("treats en variants as english", () => {
    expect(isEnglishLanguage("en")).toBe(true);
    expect(isEnglishLanguage("en-US")).toBe(true);
    expect(isEnglishLanguage("zh-CN")).toBe(false);
  });
});
