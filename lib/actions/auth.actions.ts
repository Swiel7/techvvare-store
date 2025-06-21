"use server";

import { loginSchema, registerSchema } from "@/lib/validations";
import { signIn, auth, signOut } from "@/auth";
import { hash } from "bcryptjs";
import {
  isRedirectError,
  RedirectType,
} from "next/dist/client/components/redirect-error";
import { AuthError, CredentialsSignin } from "next-auth";
import { createUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { TActionResult, TAuthenticatedUser } from "@/types";
import { getUserByEmail } from "@/lib/services/user.service";
import { z } from "zod";
import { handleErrorResponse } from "@/lib/utils";

export const redirectToUrl = async (
  url: string,
  type?: RedirectType,
): Promise<void> => {
  try {
    redirect(url, type);
  } catch (error) {
    if (!isRedirectError(error)) {
      console.error(`Failed to redirect to ${url}:`, error);
    } else throw error;
  }
};

export const authenticateUser = async (): Promise<TAuthenticatedUser> => {
  const session = await auth();

  if (!session?.user) throw new AuthError("Not authenticated!");
  return session.user as TAuthenticatedUser;
};

export const loginWithCredentials = async (
  values: z.infer<typeof loginSchema>,
): Promise<TActionResult> => {
  try {
    const validationResult = loginSchema.safeParse(values);

    if (!validationResult.success) {
      return { success: false, message: "Invalid login data!" };
    }

    await signIn("credentials", { ...validationResult.data, redirect: false });

    return { success: true, message: "Signed in successfully!" };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return handleErrorResponse(
      error,
      error instanceof CredentialsSignin
        ? "Invalid email or password!"
        : "An unexpected error occurred!",
    );
  }
};

export const register = async (
  values: z.infer<typeof registerSchema>,
): Promise<TActionResult> => {
  try {
    const validationResult = registerSchema.safeParse(values);

    if (!validationResult.success) {
      return { success: false, message: "Invalid registration data!" };
    }

    const { email, password, firstName, lastName } = validationResult.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        success: false,
        message: "A user with this email address already exists!",
      };
    }

    const hashedPassword = await hash(password, 10);

    const createUserResult = await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (!createUserResult.success) {
      return {
        success: false,
        message: createUserResult.message || "Failed to create user account!",
      };
    }

    const loginResult = await loginWithCredentials({ email, password });

    if (!loginResult.success) {
      return {
        success: false,
        message: `Account created, but auto-login failed: ${loginResult.message}`,
      };
    }

    return {
      success: true,
      message: "Account created and signed in successfully!",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return handleErrorResponse(error, "An unexpected error occurred!");
  }
};

export const logout = async (options?: {
  redirectTo?: string;
  redirect?: true | undefined;
}): Promise<void> => {
  try {
    await signOut(options);
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) throw error;
  }
};
