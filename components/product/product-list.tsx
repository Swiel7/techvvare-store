import { TFilterURLSearchParams, TProduct } from "@/types";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/product/product-card";

const ProductList = ({
  products,
  searchParams,
}: {
  products: TProduct[];
  searchParams: TFilterURLSearchParams;
}) => {
  const view = searchParams.view || "grid";

  return (
    <ul
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:gap-6",
        view === "grid" && "md:grid-cols-3",
      )}
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            variant={view === "grid" ? "vertical" : "horizontal"}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
