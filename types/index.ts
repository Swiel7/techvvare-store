import { categories, orders, products, reviews, users } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type TProduct = InferSelectModel<typeof products>;
export type TReview = InferSelectModel<typeof reviews>;
export type TUser = InferSelectModel<typeof users>;
export type TCategory = InferSelectModel<typeof categories>;
export type TOrder = InferSelectModel<typeof orders>;

export type TAuthenticatedUser = Omit<
  TUser,
  "password" | "addresses" | "wishlist" | "createdAt"
>;

export type TReviewWithAuthor = TReview & Pick<TUser, "firstName" | "lastName">;

export type TActionResult<T = null> =
  | { success: false; message: string }
  | {
      success: true;
      message: string;
      data?: T;
    };

export type TIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
