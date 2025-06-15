import { db } from '@/db';
import { users } from '@/db/schema';
import { TUser } from '@/types';
import { eq } from 'drizzle-orm';

export const getUserByEmail = async (email: string): Promise<TUser | null> => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user || null;
};
