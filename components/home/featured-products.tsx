import { ProductCard } from "@/components/product";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/services/product.service";
import Link from "next/link";

const FeaturedProducts = async () => {
  const products = await getFeaturedProducts();

  return (
    <section>
      <div className="wrapper">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 lg:pb-10">
          <h2 className="section-title pb-0">Featured Products</h2>
          <Button variant="outline" asChild>
            <Link href="/products?status=Featured">View All</Link>
          </Button>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedProducts;
