import { db } from "@/db";
import { categories, orders, products } from "@/db/schema";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { getFilterConditions } from "@/lib/services/filter.service";
import {
  TCategoryWithImage,
  TPaginationData,
  TProduct,
  TValidatedFilterSearchParams,
} from "@/types";
import {
  and,
  asc,
  eq,
  getTableColumns,
  isNotNull,
  sql,
  SQL,
} from "drizzle-orm";
import { calculatePagination, getSortOption, getTotalCount } from "@/lib/utils";
import { auth } from "@/auth";
import { getUserById } from "@/lib/services/user.service";

export const getCategoriesWithImages = async (): Promise<
  TCategoryWithImage[]
> => {
  return (await db
    .select()
    .from(categories)
    .where(isNotNull(categories.image))) as TCategoryWithImage[];
};

export const getProductsByCondition = async (options: {
  condition: SQL<unknown>;
  limit?: number;
  offset?: number;
  orderBy?: SQL;
}): Promise<TProduct[]> => {
  const { condition, limit, offset, orderBy } = options;
  const query = db.select().from(products).where(condition);

  if (orderBy) query.orderBy(orderBy);
  if (offset) query.offset(offset);
  if (limit && limit > 0) query.limit(limit);

  return await query;
};

export const getFeaturedProducts = async (limit = 4): Promise<TProduct[]> => {
  return await getProductsByCondition({
    condition: eq(products.isFeatured, true),
    limit,
    orderBy: asc(products.name),
  });
};

export const getOnSaleProducts = async (limit = 4): Promise<TProduct[]> => {
  return await getProductsByCondition({
    condition: eq(products.onSale, true),
    limit,
    orderBy: asc(products.name),
  });
};

export const getFilteredProducts = async (
  searchParams: TValidatedFilterSearchParams,
): Promise<TPaginationData<TProduct>> => {
  const sort = searchParams.sort || "default";
  const conditions = await getFilterConditions(searchParams);
  const sortOption = getSortOption(sort);

  const { currentPage, offset } = calculatePagination(
    searchParams.page,
    PRODUCTS_PER_PAGE,
  );

  const [items, totalItems] = await Promise.all([
    getProductsByCondition({
      condition: conditions || sql`true`,
      limit: PRODUCTS_PER_PAGE,
      offset,
      orderBy: sortOption,
    }),
    getTotalCount(products, conditions),
  ]);

  const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE);
  return { items, totalItems, totalPages, currentPage };
};

export const getProductBySlug = async (
  slug: string,
): Promise<(TProduct & { category: string }) | null> => {
  const product = await db
    .select({ ...getTableColumns(products), category: categories.name })
    .from(products)
    .where(eq(products.slug, slug))
    .innerJoin(categories, eq(products.categoryId, categories.id));

  return product.length > 0 ? product[0] : null;
};

export const checkUserBoughtProduct = async (
  userId: string,
  productId: string,
): Promise<boolean> => {
  const userOrders = await db
    .select()
    .from(orders)
    .where(and(eq(orders.userId, userId), eq(orders.isPaid, true)));

  const isUserBoughtProduct = userOrders.some((order) =>
    order.items.some((item) => item.productId === productId),
  );

  return isUserBoughtProduct;
};

export const checkProductOnWishlist = async (
  productId: string,
): Promise<boolean> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return false;

  const user = await getUserById(userId);
  if (!user) return false;

  const wishlistItems = user.wishlist || [];
  return wishlistItems.includes(productId);
};
