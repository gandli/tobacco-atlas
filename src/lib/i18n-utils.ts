export function isEnglishLanguage(language?: string) {
  return language?.toLowerCase().startsWith("en") ?? false;
}

export function getLocalizedText({
  language,
  zh,
  en,
}: {
  language?: string;
  zh?: string | null;
  en?: string | null;
}) {
  if (isEnglishLanguage(language) && en?.trim()) {
    return en;
  }

  return zh || en || "";
}
