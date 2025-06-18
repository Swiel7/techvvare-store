import { Filters, ProductList, ProductListHeader } from "@/components/product";
import { Pagination } from "@/components/ui/pagination";
import SectionBreadcrumb, {
  TBreadcrumbItem,
} from "@/components/ui/section-breadcrumb";
import { getFilters } from "@/lib/services/filter.service";
import { getFilteredProducts } from "@/lib/services/product.service";
import {
  createSearchParams,
  getValidatedFilterSearchParams,
} from "@/lib/utils";
import { TFilterURLSearchParams } from "@/types";
import { redirect } from "next/navigation";
import { cache } from "react";

export const metadata = { title: "Products" };

const breadcrumbItems: TBreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Products" },
];

export const revalidate = 3600;

const ProductsPage = async (props: {
  searchParams: Promise<TFilterURLSearchParams>;
}) => {
  const { params, needsRedirect } = getValidatedFilterSearchParams(
    await props.searchParams,
  );

  if (needsRedirect) {
    const searchParams = createSearchParams(params);
    redirect(`?${searchParams.toString()}`);
  }

  const [filters, { products, total, totalPages, currentPage }] = await cache(
    () => Promise.all([getFilters(params), getFilteredProducts(params)]),
  )();

  return (
    <>
      <SectionBreadcrumb items={breadcrumbItems} />
      <section>
        <div className="wrapper">
          <div className="flex gap-10 xl:gap-16">
            <div className="w-full max-w-[300px] not-lg:hidden">
              <Filters filters={filters} />
            </div>
            <div className="flex grow flex-col gap-8 lg:gap-12">
              <ProductListHeader
                searchParams={params}
                currentPage={currentPage}
                filters={filters}
                totalProducts={total}
              />
              <ProductList products={products} searchParams={params} />
              {totalPages > 1 && (
                <Pagination totalPages={totalPages} scrollToTop />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
