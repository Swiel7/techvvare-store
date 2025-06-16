import { ProductCard } from "@/components/product";
import { Button } from "@/components/ui/button";
import { getOnSaleProducts } from "@/lib/services/product.service";
import Link from "next/link";

const OnSaleProducts = async () => {
  const products = await getOnSaleProducts();

  return (
    <section className="pb-16 lg:pb-20">
      <div className="wrapper">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 lg:pb-10">
          <h2 className="section-title pb-0">On Sale Products</h2>
          <Button variant="outline" asChild>
            <Link href="/products?status=On+Sale">View All</Link>
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

export default OnSaleProducts;
