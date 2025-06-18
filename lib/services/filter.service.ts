import { db } from "@/db";
import { categories, products } from "@/db/schema";
import {
  TAvailableFilters,
  TFilterKeys,
  TFilterURLSearchParams,
} from "@/types";
import { and, eq, inArray, SQL, sql } from "drizzle-orm";
import { toArray } from "drizzle-orm/mysql-core";

export const getFilterConditions = async (
  searchParams: TFilterURLSearchParams,
  excludeKey?: Exclude<TFilterKeys, "page" | "sort">,
): Promise<SQL<unknown> | undefined> => {
  const conditions: SQL[] = [];

  if (searchParams.category && excludeKey !== "category") {
    const categoryNames = toArray(searchParams.category);
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

  if (searchParams.brand && excludeKey !== "brand") {
    conditions.push(inArray(products.brand, toArray(searchParams.brand)));
  }

  if (searchParams.color && excludeKey !== "color") {
    const colors = toArray(searchParams.color);
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM jsonb_array_elements(${products.variants}) AS elem
        WHERE elem->>'colorName' IN (${sql.join(colors, sql`, `)})
      )`,
    );
  }

  if (searchParams.status && excludeKey !== "status") {
    const statuses = toArray(searchParams.status);
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

  if (searchParams.price && excludeKey !== "price") {
    const [minPrice, maxPrice] = toArray(searchParams.price);
    conditions.push(
      sql`COALESCE(${products.discountPrice}, ${products.regularPrice}) BETWEEN ${minPrice} AND ${maxPrice}`,
    );
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
};

export const getFilters = async (
  searchParams: TFilterURLSearchParams,
): Promise<TAvailableFilters> => {
  const [category, brand, color, status] = await Promise.all([
    db
      .select({ label: categories.name, count: sql<number>`COUNT(*)` })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(await getFilterConditions(searchParams, "category"))
      .groupBy(categories.name),

    db
      .select({ label: products.brand, count: sql<number>`COUNT(*)` })
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

const getStatuses = async (conditions: SQL<unknown> | undefined) => {
  const getWhereConditions = (specificCondition?: SQL) => {
    const allConditions = [...(conditions ? [conditions] : [])];

    if (specificCondition) allConditions.push(specificCondition);
    return allConditions.length > 0 ? and(...allConditions) : undefined;
  };

  const [featured, onSale, inStock] = await Promise.all([
    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(getWhereConditions(eq(products.isFeatured, true))),

    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(getWhereConditions(eq(products.onSale, true))),

    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(
        getWhereConditions(
          sql`EXISTS (SELECT 1 FROM jsonb_array_elements(${products.variants}) AS v WHERE (v->>'stock')::int > 0)`,
        ),
      ),
  ]);

  return [
    { label: "Featured", count: featured[0]?.count || 0 },
    { label: "In Stock", count: inStock[0]?.count || 0 },
    { label: "On Sale", count: onSale[0]?.count || 0 },
  ];
};
