import { homeProducts } from "@/data/home-catalog";

const positions: Array<{
  top: string;
  left?: string;
  right?: string;
  w: number;
}> = [
  // Left side
  { top: "5%", left: "2%", w: 80 },
  { top: "20%", left: "5%", w: 90 },
  { top: "38%", left: "1%", w: 75 },
  { top: "55%", left: "4%", w: 85 },
  { top: "72%", left: "2%", w: 80 },
  { top: "5%", left: "14%", w: 85 },
  { top: "22%", left: "16%", w: 90 },
  { top: "40%", left: "13%", w: 80 },
  { top: "58%", left: "15%", w: 75 },
  { top: "75%", left: "14%", w: 85 },
  { top: "10%", left: "26%", w: 80 },
  { top: "30%", left: "25%", w: 85 },
  // Right side
  { top: "5%", right: "2%", w: 80 },
  { top: "20%", right: "5%", w: 90 },
  { top: "38%", right: "1%", w: 75 },
  { top: "55%", right: "4%", w: 85 },
  { top: "72%", right: "2%", w: 80 },
  { top: "5%", right: "14%", w: 85 },
  { top: "22%", right: "16%", w: 90 },
  { top: "40%", right: "13%", w: 80 },
  { top: "58%", right: "15%", w: 75 },
  { top: "75%", right: "14%", w: 85 },
  { top: "10%", right: "26%", w: 80 },
  { top: "30%", right: "25%", w: 85 },
];

const FloatingProducts = () => {
  const items = positions.map((pos, i) => ({
    ...pos,
    product: homeProducts[i % homeProducts.length],
  }));

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center gap-1 opacity-60"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            width: item.w,
          }}
        >
          <img
            src={item.product.image}
            alt=""
            className="w-full object-contain"
            loading="lazy"
          />
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
            {item.product.brand}（{item.product.name}）
          </span>
        </div>
      ))}
    </div>
  );
};

export default FloatingProducts;
