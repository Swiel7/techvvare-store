import { TValidatedFilterSearchParams, TProduct } from "@/types";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/product/product-card";
import Empty from "@/components/ui/empty";

const ProductList = ({
  products,
  searchParams,
}: {
  products: TProduct[];
  searchParams: TValidatedFilterSearchParams;
}) => {
  const view = searchParams.view || "grid";

  return products.length > 0 ? (
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
  ) : (
    <Empty>No products found. Try adjusting your filters.</Empty>
  );
};

export default ProductList;
