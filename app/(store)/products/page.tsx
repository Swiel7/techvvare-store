import { Filters, ProductList, ProductListHeader } from "@/components/product";
import { Pagination } from "@/components/ui/pagination";
import SectionBreadcrumb, {
  TBreadcrumbItem,
} from "@/components/ui/section-breadcrumb";
import { TAvailableFilters, TFilterURLSearchParams, TProduct } from "@/types";

export const metadata = { title: "Products" };

const breadcrumbItems: TBreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Products" },
];

const ProductsPage = async (props: {
  searchParams: Promise<TFilterURLSearchParams>;
}) => {
  const filters = {} as TAvailableFilters;
  const params = await props.searchParams;
  const currentPage = 1;
  const total = 5;
  const products = [] as TProduct[];
  const totalPages = 2;

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
