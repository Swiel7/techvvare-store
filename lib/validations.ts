import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(3, "Email must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(3, "First name must be at least 3 characters"),
    lastName: z.string().min(3, "Last name must be at least 3 characters"),
    email: z.string().email().min(3, "Email must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.boolean(),
  })
  .refine((data) => data.terms === true, {
    message: "You must accept Terms and Conditions",
    path: ["terms"],
  });

export const reviewSchema = z.object({
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(100, "Description is too long"),
});

export const shippingAddressSchema = z.object({
  name: z.string().min(1, "Full name is required.").max(150),
  address: z.object({
    line1: z.string().min(1, "Address line 1 is required.").max(255),
    line2: z.string().max(255).optional().nullable(),
    city: z.string().min(1, "City is required.").max(100),
    state: z.string().max(100),
    postal_code: z.string().min(1, "Postal code is required.").max(20),
    country: z.string().min(1, "Country is required."),
  }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords don't match",
    path: ["confirmNewPassword"],
  });

export const updateProfileSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email().min(3, "Email must be at least 3 characters"),
});
