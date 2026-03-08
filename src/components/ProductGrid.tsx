import { products } from "@/data";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <section
      id="collection"
      className="px-4 md:px-8 pb-20 pt-8 md:pt-12 max-w-[1600px] mx-auto"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8">
        {products.map((product, i) => (
          <ProductCard key={`${product.id}-${i}`} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
