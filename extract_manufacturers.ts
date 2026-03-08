import { products } from "./src/data/index";
import { writeFileSync } from "fs";

const manufacturersMap: Record<
  string,
  { brands: Set<string>; productIds: number[] }
> = {};

products.forEach((p) => {
  const name = p.manufacturer || "未知制造商";
  if (!manufacturersMap[name]) {
    manufacturersMap[name] = { brands: new Set(), productIds: [] };
  }
  if (p.brand) manufacturersMap[name].brands.add(p.brand);
  manufacturersMap[name].productIds.push(p.id);
});

const manufacturers = Object.entries(manufacturersMap).map(([name, data]) => ({
  name,
  brands: Array.from(data.brands),
  productIds: data.productIds,
}));

const content = `import { Manufacturer } from "./types";

export const manufacturers: Manufacturer[] = ${JSON.stringify(manufacturers, null, 2)};
`;

writeFileSync("./src/data/manufacturers.ts", content);
console.log(`已成功提取 ${manufacturers.length} 个制造商数据。`);
