"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { authenticateUser } from "@/lib/actions/auth.actions";
import { getUserByEmail, getUserById } from "@/lib/services/user.service";
import {
  checkShippingAddressesEqual,
  generateUniqueId,
  handleErrorResponse,
} from "@/lib/utils";
import {
  changePasswordSchema,
  shippingAddressSchema,
  updateProfileSchema,
} from "@/lib/validations";
import { TActionResult, TShippingAddress, TUser } from "@/types";
import { compare, hash } from "bcryptjs";
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

export const deleteShippingAddress = async (
  addressId: string,
  userId: string,
): Promise<TActionResult> => {
  try {
    await authenticateUser();

    const user = await getUserById(userId);
    if (!user) return { success: false, message: "User not found!" };

    const currentAddresses: TShippingAddress[] = user.addresses || [];

    const addressExists = currentAddresses.some((a) => a.id === addressId);

    if (!addressExists)
      return { success: false, message: "Shipping address not found!" };

    const newAddresses = currentAddresses.filter((a) => a.id !== addressId);

    await db
      .update(users)
      .set({ addresses: newAddresses })
      .where(eq(users.id, user.id));

    revalidatePath("/addresses");

    return { success: true, message: "Shipping address deleted successfully!" };
  } catch (error) {
    return handleErrorResponse(error, "Failed to delete shipping address!");
  }
};

export const updateShippingAddress = async (
  values: z.infer<typeof shippingAddressSchema>,
  addressId: string,
  userId: string,
): Promise<TActionResult> => {
  try {
    await authenticateUser();

    const validationResult = shippingAddressSchema.safeParse(values);

    if (!validationResult.success) {
      return { success: false, message: "Invalid shipping address data!" };
    }

    const newAddress = validationResult.data;

    const user = await getUserById(userId);

    if (!user?.addresses)
      return { success: false, message: "No addresses found for this user!" };

    const existingAddress = user.addresses.find(
      (addr) => addr.id === addressId,
    );

    if (!existingAddress)
      return { success: false, message: "Shipping address not found!" };

    if (checkShippingAddressesEqual(newAddress, existingAddress)) {
      return {
        success: false,
        message: "This shipping address already exists!",
      };
    }

    const newAddresses = user.addresses.map((a) =>
      a.id === addressId ? { ...existingAddress, ...newAddress } : a,
    );

    await db
      .update(users)
      .set({ addresses: newAddresses })
      .where(eq(users.id, user.id));

    revalidatePath("/addresses");

    return { success: true, message: "Shipping address updated successfully!" };
  } catch (error) {
    return handleErrorResponse(error, "Failed to update shipping address!");
  }
};

export const updateProfile = async (
  values: z.infer<typeof updateProfileSchema>,
): Promise<TActionResult<Pick<TUser, "firstName" | "lastName" | "email">>> => {
  try {
    const user = await authenticateUser();

    const validationResult = updateProfileSchema.safeParse(values);

    if (!validationResult.success) {
      return { success: false, message: "Invalid profile data!" };
    }

    const currentUser = await getUserById(user.id);

    if (!currentUser) return { success: false, message: "User not found!" };

    if (
      currentUser.firstName === validationResult.data.firstName &&
      currentUser.lastName === validationResult.data.lastName &&
      currentUser.email === validationResult.data.email
    ) {
      return {
        success: true,
        message: "Profile updated successfully!",
        data: validationResult.data,
      };
    }

    if (currentUser.email !== validationResult.data.email) {
      const emailOwner = await getUserByEmail(validationResult.data.email);

      if (emailOwner && emailOwner.id !== currentUser.id) {
        return {
          success: false,
          message: "This email address is already in use!",
        };
      }
    }

    const [updatedUser] = await db
      .update(users)
      .set(validationResult.data)
      .where(eq(users.id, currentUser.id))
      .returning({
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
      });

    revalidatePath("/account");

    return {
      success: true,
      message: "Profile updated successfully!",
      data: updatedUser,
    };
  } catch (error) {
    return handleErrorResponse(error, "Failed to update user profile!");
  }
};

export const changePassword = async (
  values: z.infer<typeof changePasswordSchema>,
): Promise<TActionResult<null>> => {
  try {
    const user = await authenticateUser();

    const validationResult = changePasswordSchema.safeParse(values);

    if (!validationResult.success) {
      return { success: false, message: "Invalid password data!" };
    }

    const { currentPassword, newPassword } = validationResult.data;

    const currentUser = await getUserById(user.id);

    if (!currentUser) return { success: false, message: "User not found!" };

    const isCurrentPasswordValid = await compare(
      currentPassword,
      currentUser.password,
    );

    if (!isCurrentPasswordValid)
      return { success: false, message: "Incorrect current password!" };

    const hashedPassword = await hash(newPassword, 10);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, currentUser.id));

    revalidatePath("/account");

    return { success: true, message: "Password changed successfully!" };
  } catch (error) {
    return handleErrorResponse(error, "Failed to change user password!");
  }
};
