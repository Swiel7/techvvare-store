"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { getUserById } from "@/lib/services/user.service";
import {
  checkShippingAddressesEqual,
  generateUniqueId,
  handleErrorResponse,
} from "@/lib/utils";
import { shippingAddressSchema } from "@/lib/validations";
import { TActionResult, TShippingAddress, TUser } from "@/types";
import { eq, InferInsertModel } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createUser = async (
  values: InferInsertModel<typeof users>,
): Promise<TActionResult<Omit<TUser, "password">>> => {
  try {
    const [newUser] = await db.insert(users).values(values).returning();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;

    return {
      success: true,
      message: "User created successfully!",
      data: userWithoutPassword,
    };
  } catch (error) {
    return handleErrorResponse(error, "An unexpected error occurred!");
  }
};

export const createShippingAddress = async (
  values: z.infer<typeof shippingAddressSchema>,
  userId: string,
): Promise<TActionResult> => {
  try {
    const validationResult = shippingAddressSchema.safeParse(values);

    if (!validationResult.success) {
      return { success: false, message: "Invalid shipping address data!" };
    }

    const shippingAddress = validationResult.data;

    const existingUser = await getUserById(userId);
    if (!existingUser) return { success: false, message: "User not found!" };

    const currentAddresses: TShippingAddress[] = existingUser.addresses || [];

    const addressExists = currentAddresses.some((a) =>
      checkShippingAddressesEqual(shippingAddress, a),
    );

    if (addressExists)
      return {
        success: false,
        message: "This shipping address already exists!",
      };

    const address = {
      ...shippingAddress.address,
      line2: shippingAddress.address.line2 || "",
    };

    await db
      .update(users)
      .set({
        addresses: [
          ...currentAddresses,
          { id: await generateUniqueId(), name: shippingAddress.name, address },
        ],
      })
      .where(eq(users.id, existingUser.id));

    revalidatePath("/addresses");
    return { success: true, message: "Shipping address added successfully!" };
  } catch (error) {
    return handleErrorResponse(error, "Failed to add shipping address!");
  }
};
