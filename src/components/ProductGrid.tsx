import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <section id="collection" className="px-4 md:px-8 pb-20 pt-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
        {products.map((product, i) => (
          <ProductCard key={`${product.id}-${i}`} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
