import { auth } from "@/auth";
import { ProductCard } from "@/components/product";
import { CardTitle } from "@/components/ui/card";
import Empty from "@/components/ui/empty";
import { getProductsFromWishlist } from "@/lib/services/user.service";
import { redirect } from "next/navigation";

export const metadata = { title: "Wishlist" };

const WishlistPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/login");

  const products = await getProductsFromWishlist(userId);

  return (
    <section>
      <div className="wrapper">
        <CardTitle className="mb-6">Wishlist</CardTitle>
        {products.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <Empty className="text-left">No products on wishlist.</Empty>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
