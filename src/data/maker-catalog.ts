import rawManufacturers from "./manufacturers.json";

type RawMaker = {
  name: string;
  brands: string[];
  productIds: number[];
};

export interface MakerItem {
  id: number;
  name: string;
  englishName: string;
  slug: string;
  brands: string[];
  productIds: number[];
}

const provinceAliasMap: Record<string, string> = {
  安徽: "anhui",
  北京: "beijing",
  重庆: "chongqing",
  福建: "fujian",
  甘肃: "gansu",
  广东: "guangdong",
  广西: "guangxi",
  贵州: "guizhou",
  海南: "hainan",
  河北: "hebei",
  河南: "henan",
  黑龙江: "heilongjiang",
  湖北: "hubei",
  湖南: "hunan",
  吉林: "jilin",
  江苏: "jiangsu",
  江西: "jiangxi",
  辽宁: "liaoning",
  内蒙古: "inner mongolia",
  宁夏: "ningxia",
  青海: "qinghai",
  山东: "shandong",
  山西: "shanxi",
  陕西: "shaanxi",
  上海: "shanghai",
  四川: "sichuan",
  天津: "tianjin",
  西藏: "tibet",
  新疆: "xinjiang",
  云南: "yunnan",
  浙江: "zhejiang",
  红云红河: "hongyun honghe",
};

function normalizeIdentifier(value: string): string {
  return decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/[（）()]/g, " ")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getMakerEnglishName(name: string): string {
  const province = Object.keys(provinceAliasMap).find((item) => name.startsWith(item));
  if (!province) {
    return name
      .replace(/有限责任公司/g, "")
      .replace(/集团/g, " Group")
      .replace(/烟草/g, " Tobacco")
      .replace(/工业/g, " Industry")
      .trim();
  }

  const base = provinceAliasMap[province];
  if (name.includes("烟草") && name.includes("集团")) {
    return `${base} Tobacco Group`
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return `${base} Tobacco`
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getMakerSlug(name: string, englishName: string): string {
  if (name.includes("烟草") && name.includes("集团")) {
    return englishName.toLowerCase().replace(/\s+/g, "-");
  }

  return englishName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-group$/, "");
}

export const makers: MakerItem[] = (rawManufacturers as RawMaker[]).map((maker, index) => {
  const englishName = getMakerEnglishName(maker.name);

  return {
    id: index + 1,
    name: maker.name,
    englishName,
    slug: getMakerSlug(maker.name, englishName),
    brands: maker.brands,
    productIds: maker.productIds,
  };
});

export function getMakerByIdentifier(identifier: string | number | undefined) {
  if (identifier === undefined || identifier === null) {
    return undefined;
  }

  const rawValue = String(identifier);
  const normalizedValue = normalizeIdentifier(rawValue);
  const numericId = Number.parseInt(rawValue, 10);

  return makers.find((maker) => {
    if (Number.isInteger(numericId) && maker.id === numericId) {
      return true;
    }

    return [
      maker.name,
      maker.englishName,
      maker.slug,
      String(maker.id),
    ].some((candidate) => normalizeIdentifier(candidate) === normalizedValue);
  });
}

