"use client";

import { Button } from "@/components/ui/button";
import { SLIDER_MAX_PRICE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { TAvailableFilters, TFilterOption, TFilterOptionColor } from "@/types";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const FilterTags = ({ filters }: { filters: TAvailableFilters }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tags: Record<string, string[]> = {};

  const removeTag = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key, key !== "price" ? value : undefined);
    router.replace(`?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams();
    const sort = searchParams.get("sort");
    const view = searchParams.get("view");
    if (sort) params.set("sort", sort);
    if (view) params.set("view", view);
    router.replace(`?${params.toString()}`);
  };

  const filterValues = Object.fromEntries(
    Object.entries(filters).map(([key, options]) => [
      key,
      options.map((option) =>
        key !== "color"
          ? (option as TFilterOption).label
          : (option as TFilterOptionColor).colorName,
      ),
    ]),
  );

  for (const [key, value] of searchParams.entries()) {
    if (filterValues[key]?.includes(value) || key === "price") {
      if (!tags[key]) tags[key] = [];
      tags[key].push(key !== "price" ? value : formatPrice(Number(value)));
    }
  }

  if (tags["price"] && tags["price"].length === 2) {
    if (
      tags["price"][0] === formatPrice(0) &&
      tags["price"][1] === formatPrice(SLIDER_MAX_PRICE)
    ) {
      delete tags["price"];
    } else tags["price"] = [tags["price"].join(" - ")];
  }

  return (
    <>
      {Object.entries(tags).length > 0 && (
        <ul className="flex flex-wrap items-center gap-2">
          {Object.entries(tags).map(([key, values]) =>
            values.map((value) => (
              <li key={`${key}-${value}`}>
                <Button
                  variant="secondary"
                  className="h-8 gap-x-1 text-sm"
                  onClick={() => removeTag(key, value)}
                >
                  {value}
                  <X className="size-3" />
                </Button>
              </li>
            )),
          )}
          <li>
            <Button variant="link" size="sm" className="h-8" onClick={clearAll}>
              Clear All
            </Button>
          </li>
        </ul>
      )}
    </>
  );
};

export default FilterTags;
