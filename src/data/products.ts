export interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
}

// Sample cigarette pack images from ciggies.app for demo
const baseUrl = "https://www.ciggies.app/api/img/products/";

export const products: Product[] = [
  { id: 1, name: "硬", brand: "白沙", image: `${baseUrl}2021012910035499.png` },
  { id: 2, name: "珍品", brand: "白沙", image: `${baseUrl}2020121623175180.jpg` },
  { id: 3, name: "精品二代", brand: "白沙", image: `${baseUrl}20060118154653.jpg` },
  { id: 4, name: "软", brand: "白沙", image: `${baseUrl}202508311156240110.png` },
  { id: 5, name: "和天下", brand: "白沙", image: `${baseUrl}20051213111534.jpg` },
  { id: 6, name: "和钻石", brand: "白沙", image: `${baseUrl}20050811154837.jpg` },
  { id: 7, name: "国际", brand: "利事", image: `${baseUrl}20051213111408.jpg` },
  { id: 8, name: "喜", brand: "长沙", image: `${baseUrl}20051213111437.jpg` },
  { id: 9, name: "紫和", brand: "白沙", image: `${baseUrl}20050811155029.jpg` },
  { id: 10, name: "软", brand: "长沙", image: `${baseUrl}20051213111515.jpg` },
  { id: 11, name: "银世界", brand: "白沙", image: `${baseUrl}20051206111609.jpg` },
  { id: 12, name: "绿和", brand: "白沙", image: `${baseUrl}202508222207456660.jpg` },
  { id: 13, name: "软集美", brand: "黄山", image: `${baseUrl}20060118151438.jpg` },
  { id: 14, name: "新概念", brand: "黄山", image: `${baseUrl}2019121821393202.png` },
  { id: 15, name: "万象", brand: "黄山", image: `${baseUrl}20051207164846.jpg` },
  { id: 16, name: "锦绣", brand: "黄山", image: `${baseUrl}20051207165303.jpg` },
  { id: 17, name: "经典皖烟", brand: "黄山", image: `${baseUrl}2019122015545940.png` },
  { id: 18, name: "硬", brand: "黄山", image: `${baseUrl}20060118151900.jpg` },
  { id: 19, name: "珍品", brand: "白沙", image: `${baseUrl}2020121623175180.jpg` },
  { id: 20, name: "精品二代", brand: "白沙", image: `${baseUrl}20060118154653.jpg` },
  { id: 21, name: "和天下", brand: "白沙", image: `${baseUrl}20051213111534.jpg` },
  { id: 22, name: "软集美", brand: "黄山", image: `${baseUrl}20060118151438.jpg` },
  { id: 23, name: "万象", brand: "黄山", image: `${baseUrl}20051207164846.jpg` },
  { id: 24, name: "锦绣", brand: "黄山", image: `${baseUrl}20051207165303.jpg` },
];

export const brands = [...new Set(products.map(p => p.brand))];
export const totalBrands = brands.length;
export const totalProducts = 3220;
