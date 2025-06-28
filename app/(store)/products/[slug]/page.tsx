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
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);
  return { title: product?.name };
};

export const revalidate = 3600;

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page: string }>;
}) => {
  const { slug } = await props.params;
  const { page } = await props.searchParams;

  const product = await cache(() => getProductBySlug(slug))();
  if (!product) notFound();

  const breadcrumbItems: TBreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name },
  ];

  return (
    <>
      <SectionBreadcrumb items={breadcrumbItems} />
      <section>
        <div className="wrapper">
          <div className="space-y-8 lg:space-y-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <ProductImages product={product} />
              <ProductDetails product={product} />
            </div>
            <ProductTabs product={product} page={page} />
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
