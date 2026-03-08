export interface Product {
  id: number;
  name: string;
  brand: string;
  brandPinyin: string;
  image: string;
  // Specs
  tobaccoType?: string;
  tar?: string;
  nicotine?: string;
  co?: string;
  length?: string;
  countPerBox?: number;
  boxesPerCarton?: number;
  // Pricing
  packPrice?: number;
  cartonPrice?: number;
  wholesalePrice?: number;
  // Description
  description?: string;
  descriptionZh?: string;
  // Region
  region?: "mainland" | "hkmo" | "international" | "historical";
  manufacturer?: string;
}

export interface Brand {
  id: number;
  name: string;
  pinyin: string;
  count: number;
  logo: string;
  region: "mainland" | "hkmo" | "international" | "historical";
  description?: string;
}

export interface CommunityUser {
  id: number;
  username: string;
  avatar: string;
  brands: number;
  tried: number;
  fav: number;
}

export interface FeedItem {
  id: number;
  username: string;
  avatar: string;
  action: "tried" | "wishlisted" | "favorited";
  productName: string;
  productNameEn: string;
  productImage: string;
  timeAgo: string;
}

const baseUrl = "https://www.ciggies.app/api/img/products/";

export const products: Product[] = [
  { id: 1, name: "硬", brand: "白沙", brandPinyin: "baisha", image: `${baseUrl}2021012910035499.png`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "1 mg", co: "13 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 6, cartonPrice: 60, wholesalePrice: 53, region: "mainland", manufacturer: "湖南中烟工业有限责任公司", description: 'Named after the renowned spring of Jiangnan, "Baisha Ancient Well," the packaging features this well as a backdrop, with a central design of auspicious double cranes symbolizing good fortune.', descriptionZh: '因汨罗名泉式——"白沙古井"而得名，包装以"白沙古井"为背景，集百祥开利意的双鹤图形为主体图案。' },
  { id: 2, name: "珍品", brand: "白沙", brandPinyin: "baisha", image: `${baseUrl}2020121623175180.jpg`, tobaccoType: "烤烟型", tar: "11 mg", nicotine: "1 mg", co: "13 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 10, cartonPrice: 100, wholesalePrice: 88, region: "mainland", manufacturer: "湖南中烟工业有限责任公司" },
  { id: 3, name: "精品二代", brand: "白沙", brandPinyin: "baisha", image: `${baseUrl}20060118154653.jpg`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1.1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 5, cartonPrice: 50, wholesalePrice: 44, region: "mainland", manufacturer: "湖南中烟工业有限责任公司" },
  { id: 4, name: "软", brand: "白沙", brandPinyin: "baisha", image: `${baseUrl}202508311156240110.png`, tobaccoType: "烤烟型", tar: "11 mg", nicotine: "1 mg", co: "12 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 7, cartonPrice: 70, wholesalePrice: 62, region: "mainland", manufacturer: "湖南中烟工业有限责任公司" },
  { id: 5, name: "和天下", brand: "白沙", brandPinyin: "baisha", image: `${baseUrl}20051213111534.jpg`, tobaccoType: "烤烟型", tar: "8 mg", nicotine: "0.8 mg", co: "10 mg", length: "97 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 100, cartonPrice: 1000, wholesalePrice: 880, region: "mainland", manufacturer: "湖南中烟工业有限责任公司", description: "Premium ultra-luxury cigarette from the Baisha series, using the finest tobacco leaves." },
  { id: 6, name: "和钻石", brand: "白沙", brandPinyin: "baisha", image: `${baseUrl}20050811154837.jpg`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "1 mg", co: "12 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 50, cartonPrice: 500, wholesalePrice: 440, region: "mainland", manufacturer: "湖南中烟工业有限责任公司" },
  { id: 7, name: "国际", brand: "利事", brandPinyin: "lishi", image: `${baseUrl}20051213111408.jpg`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1.1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 3, cartonPrice: 30, region: "mainland", manufacturer: "湖南中烟工业有限责任公司" },
  { id: 8, name: "喜", brand: "长沙", brandPinyin: "changsha", image: `${baseUrl}20051213111437.jpg`, tobaccoType: "烤烟型", tar: "11 mg", nicotine: "1 mg", co: "13 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 8, cartonPrice: 80, region: "mainland", manufacturer: "湖南中烟工业有限责任公司" },
  { id: 9, name: "紫和", brand: "白沙", brandPinyin: "baisha", image: `${baseUrl}20050811155029.jpg`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "1 mg", co: "12 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 15, cartonPrice: 150, wholesalePrice: 132, region: "mainland", manufacturer: "湖南中烟工业有限责任公司" },
  { id: 10, name: "软", brand: "长沙", brandPinyin: "changsha", image: `${baseUrl}20051213111515.jpg`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1.1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 5, cartonPrice: 50, region: "mainland", manufacturer: "湖南中烟工业有限责任公司" },
  { id: 11, name: "银世界", brand: "白沙", brandPinyin: "baisha", image: `${baseUrl}20051206111609.jpg`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "0.9 mg", co: "11 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 20, cartonPrice: 200, wholesalePrice: 176, region: "mainland", manufacturer: "湖南中烟工业有限责任公司" },
  { id: 12, name: "绿和", brand: "白沙", brandPinyin: "baisha", image: `${baseUrl}202508222207456660.jpg`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "1 mg", co: "12 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 16, cartonPrice: 160, wholesalePrice: 141, region: "mainland", manufacturer: "湖南中烟工业有限责任公司" },
  { id: 13, name: "软集美", brand: "黄山", brandPinyin: "huangshan", image: `${baseUrl}20060118151438.jpg`, tobaccoType: "烤烟型", tar: "11 mg", nicotine: "1 mg", co: "13 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 5, cartonPrice: 50, wholesalePrice: 44, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 14, name: "新概念", brand: "黄山", brandPinyin: "huangshan", image: `${baseUrl}2019121821393202.png`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "0.9 mg", co: "11 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 10, cartonPrice: 100, wholesalePrice: 88, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 15, name: "万象", brand: "黄山", brandPinyin: "huangshan", image: `${baseUrl}20051207164846.jpg`, tobaccoType: "烤烟型", tar: "11 mg", nicotine: "1 mg", co: "12 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 7, cartonPrice: 70, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 16, name: "锦绣", brand: "黄山", brandPinyin: "huangshan", image: `${baseUrl}20051207165303.jpg`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "0.9 mg", co: "11 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 15, cartonPrice: 150, wholesalePrice: 132, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 17, name: "经典皖烟", brand: "黄山", brandPinyin: "huangshan", image: `${baseUrl}2019122015545940.png`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1.1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 6, cartonPrice: 60, wholesalePrice: 53, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 18, name: "硬", brand: "黄山", brandPinyin: "huangshan", image: `${baseUrl}20060118151900.jpg`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1.1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 4, cartonPrice: 40, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 19, name: "5mg", brand: "丹健", brandPinyin: "danjian", image: `${baseUrl}20051207170550.jpg`, tobaccoType: "烤烟型", tar: "5 mg", nicotine: "0.5 mg", co: "7 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 3, cartonPrice: 30, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 20, name: "黄软", brand: "渡江", brandPinyin: "dujiang", image: `${baseUrl}20060118144622.jpg`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1 mg", co: "13 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 3, cartonPrice: 30, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 21, name: "东海蓝硬", brand: "渡江", brandPinyin: "dujiang", image: `${baseUrl}20060118144458.jpg`, tobaccoType: "烤烟型", tar: "11 mg", nicotine: "1 mg", co: "12 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 5, cartonPrice: 50, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 22, name: "铂金硬", brand: "渡江", brandPinyin: "dujiang", image: `${baseUrl}20060118144101.jpg`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "0.9 mg", co: "11 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 8, cartonPrice: 80, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 23, name: "东海蓝软", brand: "渡江", brandPinyin: "dujiang", image: `${baseUrl}20051208085924.jpg`, tobaccoType: "烤烟型", tar: "11 mg", nicotine: "1 mg", co: "12 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 5, cartonPrice: 50, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 24, name: "金装8mg", brand: "中南海", brandPinyin: "zhongnanhai", image: `${baseUrl}20051214114322.jpg`, tobaccoType: "混合型", tar: "8 mg", nicotine: "0.7 mg", co: "9 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 10, cartonPrice: 100, wholesalePrice: 88, region: "mainland", manufacturer: "北京卷烟厂有限公司" },
  { id: 25, name: "黑耀8mg", brand: "中南海", brandPinyin: "zhongnanhai", image: `${baseUrl}20051214114335.jpg`, tobaccoType: "混合型", tar: "8 mg", nicotine: "0.7 mg", co: "9 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 13, cartonPrice: 130, wholesalePrice: 115, region: "mainland", manufacturer: "北京卷烟厂有限公司" },
  { id: 26, name: "10mg", brand: "中南海", brandPinyin: "zhongnanhai", image: `${baseUrl}20060118153455.jpg`, tobaccoType: "混合型", tar: "10 mg", nicotine: "0.8 mg", co: "10 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 7, cartonPrice: 70, wholesalePrice: 62, region: "mainland", manufacturer: "北京卷烟厂有限公司" },
  { id: 27, name: "8mg", brand: "中南海", brandPinyin: "zhongnanhai", image: `${baseUrl}20051214114427.jpg`, tobaccoType: "混合型", tar: "8 mg", nicotine: "0.7 mg", co: "9 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 8, cartonPrice: 80, wholesalePrice: 71, region: "mainland", manufacturer: "北京卷烟厂有限公司" },
  { id: 28, name: "5mg", brand: "中南海", brandPinyin: "zhongnanhai", image: `${baseUrl}20051214114512.jpg`, tobaccoType: "混合型", tar: "5 mg", nicotine: "0.5 mg", co: "6 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 10, cartonPrice: 100, wholesalePrice: 88, region: "mainland", manufacturer: "北京卷烟厂有限公司" },
  { id: 29, name: "3mg", brand: "中南海", brandPinyin: "zhongnanhai", image: `${baseUrl}2020122622503780.jpg`, tobaccoType: "混合型", tar: "3 mg", nicotine: "0.3 mg", co: "4 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 15, cartonPrice: 150, wholesalePrice: 132, region: "mainland", manufacturer: "北京卷烟厂有限公司" },
  { id: 30, name: "红", brand: "北京", brandPinyin: "beijing", image: `${baseUrl}20051214114942.jpg`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 3, cartonPrice: 30, region: "mainland", manufacturer: "北京卷烟厂有限公司" },
  { id: 31, name: "红", brand: "东方红", brandPinyin: "dongfanghong", image: `${baseUrl}20051216112929.jpg`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1.1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 2, cartonPrice: 20, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 32, name: "情悠悠薄荷味", brand: "黄鹤楼", brandPinyin: "huanghelou", image: `${baseUrl}20051219173229.jpg`, tobaccoType: "烤烟型", tar: "8 mg", nicotine: "0.8 mg", co: "10 mg", length: "97 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 25, cartonPrice: 250, wholesalePrice: 220, region: "mainland", manufacturer: "湖北中烟工业有限责任公司" },
  { id: 33, name: "硬红经典", brand: "娇子", brandPinyin: "jiaozi", image: `${baseUrl}20051219174104.jpg`, tobaccoType: "烤烟型", tar: "11 mg", nicotine: "1 mg", co: "12 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 7, cartonPrice: 70, wholesalePrice: 62, region: "mainland", manufacturer: "四川中烟工业有限责任公司" },
  { id: 34, name: "蓝", brand: "娇子", brandPinyin: "jiaozi", image: `${baseUrl}20060119144308.jpg`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "0.9 mg", co: "11 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 10, cartonPrice: 100, wholesalePrice: 88, region: "mainland", manufacturer: "四川中烟工业有限责任公司" },
  { id: 35, name: "红钟鼎", brand: "红三环", brandPinyin: "hongsanhuan", image: `${baseUrl}2017022016502289.png`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1.1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 3, cartonPrice: 30, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 36, name: "5福盈门", brand: "红三环", brandPinyin: "hongsanhuan", image: `${baseUrl}20070304045200.jpg`, tobaccoType: "烤烟型", tar: "11 mg", nicotine: "1 mg", co: "13 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 5, cartonPrice: 50, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 37, name: "红", brand: "红三环", brandPinyin: "hongsanhuan", image: `${baseUrl}20070304045406.jpg`, tobaccoType: "烤烟型", tar: "13 mg", nicotine: "1.2 mg", co: "15 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 2, cartonPrice: 20, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 38, name: "硬黄", brand: "红三环", brandPinyin: "hongsanhuan", image: `${baseUrl}20060119145832.jpg`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1.1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 3, cartonPrice: 30, region: "mainland", manufacturer: "安徽中烟工业有限责任公司" },
  { id: 39, name: "蓝", brand: "赣", brandPinyin: "gan", image: `${baseUrl}20060930024007.jpg`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 3, cartonPrice: 30, region: "mainland", manufacturer: "江西中烟工业有限责任公司" },
  { id: 40, name: "佳品", brand: "赣", brandPinyin: "gan", image: `${baseUrl}20060930024544.jpg`, tobaccoType: "烤烟型", tar: "11 mg", nicotine: "1 mg", co: "13 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 5, cartonPrice: 50, region: "mainland", manufacturer: "江西中烟工业有限责任公司" },
  { id: 41, name: "软经典", brand: "双喜", brandPinyin: "shuangxi", image: `${baseUrl}20061007135410.png`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1 mg", co: "13 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 10, cartonPrice: 100, wholesalePrice: 88, region: "mainland", manufacturer: "广东中烟工业有限责任公司" },
  { id: 42, name: "软", brand: "双喜", brandPinyin: "shuangxi", image: `${baseUrl}20090819030406.jpg`, tobaccoType: "烤烟型", tar: "12 mg", nicotine: "1 mg", co: "14 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 6, cartonPrice: 60, wholesalePrice: 53, region: "mainland", manufacturer: "广东中烟工业有限责任公司" },
  { id: 43, name: "软", brand: "椰树", brandPinyin: "yeshu", image: `${baseUrl}20050813100545.jpg`, tobaccoType: "烤烟型", tar: "13 mg", nicotine: "1.2 mg", co: "15 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 3, cartonPrice: 30, region: "mainland", manufacturer: "海南红塔卷烟有限责任公司" },
  { id: 44, name: "特醇", brand: "椰树", brandPinyin: "yeshu", image: `${baseUrl}20050813100659.jpg`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "0.9 mg", co: "11 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 5, cartonPrice: 50, region: "mainland", manufacturer: "海南红塔卷烟有限责任公司" },
  { id: 45, name: "硬红", brand: "万宝路", brandPinyin: "marlboro", image: `${baseUrl}20051223104819.jpg`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "0.8 mg", co: "10 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 25, cartonPrice: 250, region: "hkmo", manufacturer: "Philip Morris" },
  { id: 46, name: "硬白", brand: "万宝路", brandPinyin: "marlboro", image: `${baseUrl}20051223104753.jpg`, tobaccoType: "烤烟型", tar: "6 mg", nicotine: "0.5 mg", co: "7 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 25, cartonPrice: 250, region: "hkmo", manufacturer: "Philip Morris" },
  { id: 47, name: "珍品", brand: "真龙", brandPinyin: "zhenlong", image: `${baseUrl}20051221103120.jpg`, tobaccoType: "烤烟型", tar: "10 mg", nicotine: "0.9 mg", co: "12 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 15, cartonPrice: 150, wholesalePrice: 132, region: "mainland", manufacturer: "广西中烟工业有限责任公司" },
  { id: 48, name: "软红", brand: "羊城", brandPinyin: "yangcheng", image: `${baseUrl}20050813100851.jpg`, tobaccoType: "烤烟型", tar: "13 mg", nicotine: "1.2 mg", co: "15 mg", length: "84 mm", countPerBox: 20, boxesPerCarton: 10, packPrice: 3, cartonPrice: 30, region: "mainland", manufacturer: "广东中烟工业有限责任公司" },
];

export const brands: Brand[] = [
  { id: 1, name: "黄鹤楼", pinyin: "huanghelou", count: 217, logo: "https://www.ciggies.app/api/img/brands/huanghelou.png", region: "mainland" },
  { id: 2, name: "娇子", pinyin: "jiaozi", count: 152, logo: "https://www.ciggies.app/api/img/brands/jiaozi.png", region: "mainland" },
  { id: 3, name: "黄金叶", pinyin: "huangjinye", count: 121, logo: "https://www.ciggies.app/api/img/brands/huangjinye.png", region: "mainland" },
  { id: 4, name: "黄山", pinyin: "huangshan", count: 109, logo: "https://www.ciggies.app/api/img/brands/huangshan.png", region: "mainland" },
  { id: 5, name: "钻石", pinyin: "zuanshi", count: 103, logo: "https://www.ciggies.app/api/img/brands/zuanshi.png", region: "mainland" },
  { id: 6, name: "云烟", pinyin: "yunyan", count: 96, logo: "https://www.ciggies.app/api/img/brands/yunyan.png", region: "mainland" },
  { id: 7, name: "泰山", pinyin: "taishan", count: 95, logo: "https://www.ciggies.app/api/img/brands/taishan.png", region: "mainland" },
  { id: 8, name: "长城雪茄", pinyin: "changchengxueqie", count: 80, logo: "https://www.ciggies.app/api/img/brands/changchengxueqie.png", region: "mainland" },
  { id: 9, name: "红金龙", pinyin: "hongjinlong", count: 84, logo: "https://www.ciggies.app/api/img/brands/hongjinlong.png", region: "mainland" },
  { id: 10, name: "七匹狼", pinyin: "qipilang", count: 81, logo: "https://www.ciggies.app/api/img/brands/qipilang.png", region: "mainland" },
  { id: 11, name: "金圣", pinyin: "jinsheng", count: 72, logo: "https://www.ciggies.app/api/img/brands/jinsheng.png", region: "mainland" },
  { id: 12, name: "双喜", pinyin: "shuangxi", count: 67, logo: "https://www.ciggies.app/api/img/brands/shuangxi.png", region: "mainland" },
  { id: 13, name: "真龙", pinyin: "zhenlong", count: 59, logo: "https://www.ciggies.app/api/img/brands/zhenlong.png", region: "mainland" },
  { id: 14, name: "玉溪", pinyin: "yuxi", count: 54, logo: "https://www.ciggies.app/api/img/brands/yuxi.png", region: "mainland" },
  { id: 15, name: "贵烟", pinyin: "guiyan", count: 54, logo: "https://www.ciggies.app/api/img/brands/guiyan.png", region: "mainland" },
  { id: 16, name: "长白山", pinyin: "changbaishan", count: 54, logo: "https://www.ciggies.app/api/img/brands/changbaishan.png", region: "mainland" },
  { id: 17, name: "白沙", pinyin: "baisha", count: 52, logo: "https://www.ciggies.app/api/img/brands/baisha.png", region: "mainland" },
  { id: 18, name: "利群", pinyin: "liqun", count: 50, logo: "https://www.ciggies.app/api/img/brands/liqun.png", region: "mainland" },
  { id: 19, name: "王冠", pinyin: "wangguan", count: 46, logo: "https://www.ciggies.app/api/img/brands/wangguan.png", region: "mainland" },
  { id: 20, name: "南京", pinyin: "nanjing", count: 42, logo: "https://www.ciggies.app/api/img/brands/nanjing.png", region: "mainland" },
  { id: 21, name: "芙蓉王", pinyin: "furongwang", count: 40, logo: "https://www.ciggies.app/api/img/brands/furongwang.png", region: "mainland" },
  { id: 22, name: "红塔山", pinyin: "hongtashan", count: 38, logo: "https://www.ciggies.app/api/img/brands/hongtashan.png", region: "mainland" },
  { id: 23, name: "中南海", pinyin: "zhongnanhai", count: 37, logo: "https://www.ciggies.app/api/img/brands/zhongnanhai.png", region: "mainland" },
  { id: 24, name: "兰州", pinyin: "lanzhou", count: 36, logo: "https://www.ciggies.app/api/img/brands/lanzhou.png", region: "mainland" },
  // HK/Macau/Taiwan
  { id: 101, name: "万宝路", pinyin: "marlboro", count: 15, logo: "https://www.ciggies.app/api/img/brands/marlboro.png", region: "hkmo" },
  { id: 102, name: "骆驼", pinyin: "camel", count: 12, logo: "https://www.ciggies.app/api/img/brands/camel.png", region: "hkmo" },
  // International
  { id: 201, name: "Sobranie", pinyin: "sobranie", count: 8, logo: "https://www.ciggies.app/api/img/brands/sobranie.png", region: "international" },
  { id: 202, name: "Dunhill", pinyin: "dunhill", count: 6, logo: "https://www.ciggies.app/api/img/brands/dunhill.png", region: "international" },
  // Historical
  { id: 301, name: "大前门", pinyin: "daqianmen", count: 10, logo: "https://www.ciggies.app/api/img/brands/daqianmen.png", region: "historical" },
  { id: 302, name: "飞马", pinyin: "feima", count: 5, logo: "https://www.ciggies.app/api/img/brands/feima.png", region: "historical" },
];

export const communityUsers: CommunityUser[] = [
  { id: 1, username: "naeli99", avatar: "https://lh3.googleusercontent.com/a/ACg8ocIptn9RX1zwI0hmz3H8AchM3WI3L1-_0-S3A77Azy0Ab5YbAk8=s96-c", brands: 39, tried: 81, fav: 32 },
  { id: 2, username: "bells_1001", avatar: "", brands: 26, tried: 73, fav: 11 },
  { id: 3, username: "zhongnanhai", avatar: "https://www.ciggies.app/api/img/avatars/111215740077435118109.jpg", brands: 25, tried: 59, fav: 12 },
  { id: 4, username: "mike", avatar: "https://lh3.googleusercontent.com/a/ACg8ocLDmgkNKhmyQM-snsHjec5DDJM_p4NwEa4zVSFP_8EZihCcdQM=s96-c", brands: 13, tried: 47, fav: 4 },
  { id: 5, username: "jarle", avatar: "https://lh3.googleusercontent.com/a/ACg8ocKfMI7dBe62fN8EKq6bC2KJzVjC_yUtN-izaJs1N6sr6hwjiSas=s96-c", brands: 18, tried: 43, fav: 22 },
  { id: 6, username: "smolensk", avatar: "https://lh3.googleusercontent.com/a/ACg8ocIfX79B-rUwVFpM7DozswZQ3bNVwgA9pfq-bj1CVXb5fH5Z0E8=s96-c", brands: 21, tried: 41, fav: 26 },
  { id: 7, username: "kura", avatar: "https://www.ciggies.app/api/img/avatars/116614369573467689846.jpg", brands: 22, tried: 39, fav: 1 },
  { id: 8, username: "smokill", avatar: "", brands: 20, tried: 39, fav: 7 },
  { id: 9, username: "nate_higger", avatar: "https://lh3.googleusercontent.com/a/ACg8ocKfMI7dBe62fN8EKq6bC2KJzVjC_yUtN-izaJs1N6sr6hwjiSas=s96-c", brands: 13, tried: 38, fav: 29 },
  { id: 10, username: "gandhoyy", avatar: "https://lh3.googleusercontent.com/a/ACg8ocIfX79B-rUwVFpM7DozswZQ3bNVwgA9pfq-bj1CVXb5fH5Z0E8=s96-c", brands: 20, tried: 37, fav: 3 },
  { id: 11, username: "ciggypudding", avatar: "https://www.ciggies.app/api/img/avatars/113029782528166028366.jpg", brands: 15, tried: 35, fav: 18 },
  { id: 12, username: "tasman", avatar: "https://lh3.googleusercontent.com/a/ACg8ocKIaySKjglx0sLGk9nvHjEIjlrmPSwui2TNi20OxkInBFiAIZ0=s96-c", brands: 12, tried: 30, fav: 8 },
];

export const feedItems: FeedItem[] = [
  { id: 1, username: "perfectwife", avatar: "https://www.ciggies.app/api/img/avatars/108646574721970345419.jpg", action: "tried", productName: "南京（炫赫门）", productNameEn: "Nanjing Hyun Herman", productImage: `${baseUrl}20091130100255.jpg`, timeAgo: "46m ago" },
  { id: 2, username: "tasman", avatar: "https://lh3.googleusercontent.com/a/ACg8ocKIaySKjglx0sLGk9nvHjEIjlrmPSwui2TNi20OxkInBFiAIZ0=s96-c", action: "tried", productName: "双喜（软经典）", productNameEn: "Shuangxi Classic Soft", productImage: `${baseUrl}20061007135410.png`, timeAgo: "1h ago" },
  { id: 3, username: "ciggypudding", avatar: "https://www.ciggies.app/api/img/avatars/113029782528166028366.jpg", action: "tried", productName: "中华（硬）", productNameEn: "Chunghwa Hard", productImage: `${baseUrl}202507301114199930.jpg`, timeAgo: "1h ago" },
  { id: 4, username: "ciggypudding", avatar: "https://www.ciggies.app/api/img/avatars/113029782528166028366.jpg", action: "wishlisted", productName: "万宝路（双爆珠橙味）", productNameEn: "Marlboro Double Burst", productImage: `${baseUrl}20051223104819.jpg`, timeAgo: "1h ago" },
  { id: 5, username: "ciggypudding", avatar: "https://www.ciggies.app/api/img/avatars/113029782528166028366.jpg", action: "tried", productName: "白沙（和天下）", productNameEn: "Baisha Harmonization", productImage: `${baseUrl}20051213111534.jpg`, timeAgo: "1h ago" },
  { id: 6, username: "gandhoyy", avatar: "https://lh3.googleusercontent.com/a/ACg8ocIfX79B-rUwVFpM7DozswZQ3bNVwgA9pfq-bj1CVXb5fH5Z0E8=s96-c", action: "wishlisted", productName: "七匹狼（睿典）", productNameEn: "Septwolves Ruidian", productImage: `${baseUrl}20051219174104.jpg`, timeAgo: "2h ago" },
  { id: 7, username: "teamkippen", avatar: "", action: "tried", productName: "黄山（红方印）", productNameEn: "Huangshan Hongfangyin", productImage: `${baseUrl}20060118151438.jpg`, timeAgo: "2h ago" },
  { id: 8, username: "perfectwife", avatar: "https://www.ciggies.app/api/img/avatars/108646574721970345419.jpg", action: "tried", productName: "贵烟（玉液1号）", productNameEn: "Guiyan Yuyi 1", productImage: `${baseUrl}20060930024007.jpg`, timeAgo: "2h ago" },
  { id: 9, username: "perfectwife", avatar: "https://www.ciggies.app/api/img/avatars/108646574721970345419.jpg", action: "favorited", productName: "贵烟（玉液1号）", productNameEn: "Guiyan Yuyi 1", productImage: `${baseUrl}20060930024007.jpg`, timeAgo: "2h ago" },
  { id: 10, username: "teamkippen", avatar: "", action: "wishlisted", productName: "好猫（长乐九美）", productNameEn: "Haomao Langle Jiumei", productImage: `${baseUrl}20051207164846.jpg`, timeAgo: "2h ago" },
  { id: 11, username: "teamkippen", avatar: "", action: "tried", productName: "好猫（长乐九美）", productNameEn: "Haomao Langle Jiumei", productImage: `${baseUrl}20051207164846.jpg`, timeAgo: "2h ago" },
  { id: 12, username: "naeli99", avatar: "https://lh3.googleusercontent.com/a/ACg8ocIptn9RX1zwI0hmz3H8AchM3WI3L1-_0-S3A77Azy0Ab5YbAk8=s96-c", action: "tried", productName: "黄鹤楼（情悠悠）", productNameEn: "Huanghelou Qingyouyou", productImage: `${baseUrl}20051219173229.jpg`, timeAgo: "3h ago" },
];

export const totalBrands = 218;
export const totalProducts = 3220;

export const regionLabels: Record<string, { zh: string; en: string }> = {
  mainland: { zh: "大陆", en: "Mainland China" },
  hkmo: { zh: "港澳台", en: "HK · Macau · Taiwan" },
  international: { zh: "国外", en: "International" },
  historical: { zh: "历史", en: "Historical" },
};

// Helper functions
export function getProductsByBrand(brandPinyin: string): Product[] {
  return products.filter((p) => p.brandPinyin === brandPinyin);
}

export function getBrandByPinyin(pinyin: string): Brand | undefined {
  return brands.find((b) => b.pinyin === pinyin);
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
