import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TShippingAddress, TUser } from "@/types";

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
