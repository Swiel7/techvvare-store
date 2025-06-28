import { db } from "@/db";
import { products, users } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { TProduct, TShippingAddress, TUser } from "@/types";

export const getUserByEmail = async (email: string): Promise<TUser | null> => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user || null;
};

export const getUserById = async (id: string): Promise<TUser | null> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  return user || null;
};

export const getShippingAddresses = async (
  userId: string,
): Promise<TShippingAddress[]> => {
  const [result] = await db
    .select({ addresses: users.addresses })
    .from(users)
    .where(eq(users.id, userId));

  return result?.addresses || [];
};

export const getProductsFromWishlist = async (
  userId: string,
): Promise<TProduct[]> => {
  const [result] = await db
    .select({ wishlist: users.wishlist })
    .from(users)
    .where(eq(users.id, userId));

  const wishlist = result.wishlist || [];
  if (wishlist.length === 0) return [];

  return await db.select().from(products).where(inArray(products.id, wishlist));
};
