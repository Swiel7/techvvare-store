import { sortOptions } from "@/data";
import { categories, orders, products, reviews, users } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type TProduct = InferSelectModel<typeof products>;
export type TReview = InferSelectModel<typeof reviews>;
export type TUser = InferSelectModel<typeof users>;
export type TCategory = InferSelectModel<typeof categories>;
export type TOrder = InferSelectModel<typeof orders>;

export type TCartItem = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  variantId: string;
  price: number;
  quantity: number;
  color: string;
};

export type TAuthenticatedUser = Omit<
  TUser,
  "password" | "addresses" | "wishlist" | "createdAt"
>;

export type TReviewWithAuthor = TReview & Pick<TUser, "firstName" | "lastName">;

export type TRatingCounts = Record<5 | 4 | 3 | 2 | 1, number>;

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

export type TFilterKeys =
  | "status"
  | "category"
  | "brand"
  | "price"
  | "color"
  | "page"
  | "sort"
  | "view";

export type TFilterURLSearchParams = Record<
  TFilterKeys,
  string | string[] | undefined
>;

export type TFilterOption = { label: string; count: number };
export type TFilterOptionColor = { colorName: string; colorCode: string };
export type TSortValue = (typeof sortOptions)[number]["value"];

export type TAvailableFilters = {
  category: TFilterOption[];
  brand: TFilterOption[];
  color: TFilterOptionColor[];
  status: TFilterOption[];
};
