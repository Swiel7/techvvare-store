import { FeaturedProducts } from "@/components/home";
import {
  ProductDetails,
  ProductImages,
  ProductTabs,
} from "@/components/product";
import Loading from "@/components/ui/loading";
import SectionBreadcrumb, {
  TBreadcrumbItem,
} from "@/components/ui/section-breadcrumb";
import { getProductBySlug } from "@/lib/services/product.service";
import { TReviewWithAuthor } from "@/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);
  return { title: product?.name };
};

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page: string }>;
}) => {
  const { slug } = await props.params;
  const { page } = await props.searchParams;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const breadcrumbItems: TBreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name },
  ];

  // TODO:
  const isOnWishlist = false;
  const reviews = [] as TReviewWithAuthor[];
  const totalPages = 1;
  const totalReviews = 0;
  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  console.log(page);

  return (
    <>
      <SectionBreadcrumb items={breadcrumbItems} />
      <section>
        <div className="wrapper">
          <div className="space-y-8 lg:space-y-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <ProductImages product={product} />
              <ProductDetails product={product} isOnWishlist={isOnWishlist} />
            </div>
            <ProductTabs
              product={product}
              reviews={reviews}
              totalPages={totalPages}
              totalReviews={totalReviews}
              ratingCounts={ratingCounts}
            />
          </div>
        </div>
      </section>
      <Suspense fallback={<Loading />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
};

export default ProductDetailsPage;
