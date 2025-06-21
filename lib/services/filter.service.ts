import { db } from "@/db";
import { categories, products } from "@/db/schema";
import {
  TAvailableFilters,
  TFilterKeys,
  TFilterOption,
  TValidatedFilterSearchParams,
} from "@/types";
import { and, eq, inArray, SQL, sql } from "drizzle-orm";
import { toArray } from "drizzle-orm/mysql-core";

export const getFilterConditions = async (
  searchParams: TValidatedFilterSearchParams,
  excludeKey?: Exclude<TFilterKeys, "page" | "sort">,
): Promise<SQL<unknown> | undefined> => {
  const conditions: SQL[] = [];

  if (searchParams.category && excludeKey !== "category") {
    const categoryNames = toArray(searchParams.category);

    if (categoryNames.length > 0) {
      const categoryIds = await db
        .select({ id: categories.id })
        .from(categories)
        .where(inArray(categories.name, categoryNames));

      if (categoryIds.length > 0) {
        conditions.push(
          inArray(
            products.categoryId,
            categoryIds.map((c) => c.id),
          ),
        );
      }
    }
  }

  if (searchParams.brand && excludeKey !== "brand") {
    const brands = toArray(searchParams.brand);

    if (brands.length > 0) {
      conditions.push(inArray(products.brand, brands));
    }
  }

  if (searchParams.color && excludeKey !== "color") {
    const colors = toArray(searchParams.color);

    if (colors.length > 0) {
      conditions.push(
        sql`EXISTS (
          SELECT 1 FROM jsonb_array_elements(${products.variants}) AS elem
          WHERE elem->>'colorName' IN (${sql.join(colors, sql`, `)})
        )`,
      );
    }
  }

  if (searchParams.status && excludeKey !== "status") {
    const statuses = toArray(searchParams.status);

    if (statuses.length > 0) {
      if (statuses.includes("Featured")) {
        conditions.push(eq(products.isFeatured, true));
      }
      if (statuses.includes("On Sale")) {
        conditions.push(eq(products.onSale, true));
      }
      if (statuses.includes("In Stock")) {
        conditions.push(
          sql`EXISTS (
            SELECT 1 FROM jsonb_array_elements(${products.variants}) AS variant
            WHERE (variant->>'stock')::int > 0
          )`,
        );
      }
    }
  }

  if (searchParams.price && excludeKey !== "price") {
    const prices = toArray(searchParams.price);

    if (prices.length === 2) {
      const [minPrice, maxPrice] = prices;
      conditions.push(
        sql`COALESCE(${products.discountPrice}, ${products.regularPrice}) BETWEEN ${minPrice} AND ${maxPrice}`,
      );
    }
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
};

export const getFilters = async (
  searchParams: TValidatedFilterSearchParams,
): Promise<TAvailableFilters> => {
  const [category, brand, color, status] = await Promise.all([
    db
      .select({
        label: categories.name,
        count: sql<number>`CAST(COUNT(*) AS INTEGER)`,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(await getFilterConditions(searchParams, "category"))
      .groupBy(categories.name),

    db
      .select({
        label: products.brand,
        count: sql<number>`CAST(COUNT(*) AS INTEGER)`,
      })
      .from(products)
      .where(await getFilterConditions(searchParams, "brand"))
      .groupBy(products.brand),

    db.selectDistinct().from(
      db
        .select({
          colorName: sql<string>`variant->>'colorName'`.as("colorName"),
          colorCode: sql<string>`variant->>'colorCode'`.as("colorCode"),
        })
        .from(products)
        .where(await getFilterConditions(searchParams, "color"))
        .innerJoin(
          sql`LATERAL jsonb_array_elements(${products.variants}) as variant`,
          sql`true`,
        )
        .as("sq"),
    ),

    getStatuses(await getFilterConditions(searchParams, "status")),
  ]);

  return { category, brand, color, status };
};

const getStatuses = async (
  conditions: SQL<unknown> | undefined,
): Promise<TFilterOption[]> => {
  const result = await db
    .select({
      featuredCount:
        sql<number>`CAST(COUNT(*) FILTER (WHERE ${products.isFeatured} = true) AS INTEGER)`.as(
          "featuredCount",
        ),
      onSaleCount:
        sql<number>`CAST(COUNT(*) FILTER (WHERE ${products.onSale} = true) AS INTEGER)`.as(
          "onSaleCount",
        ),
      inStockCount: sql<number>`CAST(COUNT(*) FILTER (WHERE EXISTS (
        SELECT 1 FROM jsonb_array_elements(${products.variants}) AS v 
        WHERE (v->>'stock')::int > 0
      )) AS INTEGER)`.as("inStockCount"),
    })
    .from(products)
    .where(conditions);

  return [
    { label: "Featured", count: result[0]?.featuredCount || 0 },
    { label: "In Stock", count: result[0]?.inStockCount || 0 },
    { label: "On Sale", count: result[0]?.onSaleCount || 0 },
  ];
};
