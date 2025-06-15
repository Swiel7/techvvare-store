'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { TActionResult, TUser } from '@/types';
import { InferInsertModel } from 'drizzle-orm';

export const createUser = async (
  values: InferInsertModel<typeof users>
): Promise<TActionResult<Omit<TUser, 'password'>>> => {
  try {
    const [newUser] = await db.insert(users).values(values).returning();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;

    return { success: true, message: 'User created successfully!', data: userWithoutPassword };
  } catch (error) {
    console.error(error);

    return { success: false, message: 'An unexpected error occurred!' };
  }
};
