"use client";

import { Button } from "@/components/ui/button";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { TAvailableFilters, TValidatedFilterSearchParams } from "@/types";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions } from "@/data";
import { createSearchParams } from "@/lib/utils";
import MobileFilters from "@/components/product/mobile-filters";
import FilterTags from "@/components/product/filter-tags";

type ProductListHeaderProps = {
  searchParams: TValidatedFilterSearchParams;
  totalProducts: number;
  currentPage: number;
  filters: TAvailableFilters;
};

const ProductListHeader = ({
  searchParams,
  currentPage,
  filters,
  totalProducts,
}: ProductListHeaderProps) => {
  const router = useRouter();
  const view = searchParams.view || "grid";

  const setSort = (value: string) => {
    const params = createSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const setView = (value: string) => {
    const params = createSearchParams(searchParams);
    params.set("view", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <LayoutGrid />
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("list")}
            >
              <LayoutList />
            </Button>
          </div>
          <p>
            Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
            {Math.min(currentPage * PRODUCTS_PER_PAGE, totalProducts)} of{" "}
            {totalProducts} results
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <MobileFilters filters={filters} />
          <Select
            value={(searchParams.sort as string) || "default"}
            onValueChange={(value) => setSort(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(({ name, value }) => (
                <SelectItem key={value} value={value}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <FilterTags filters={filters} />
    </div>
  );
};

export default ProductListHeader;
