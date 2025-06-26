import { sortValues } from "@/data";
import { SLIDER_MAX_PRICE } from "@/lib/constants";
import {
  TActionResult,
  TFilterSearchParams,
  TOrder,
  TShippingAddress,
  TSortValue,
  TValidatedFilterSearchParams,
} from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { AuthError } from "next-auth";
import { sql, SQL } from "drizzle-orm";
import { db } from "@/db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (amountInCents: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amountInCents / 100);
};

export const formatDate = (date: Date | number | string): string => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export const createSearchParams = (
  paramsRecord: Record<string, string | string[] | number | undefined | null>,
): URLSearchParams => {
  const params = new URLSearchParams();

  for (const key in paramsRecord) {
    const value = paramsRecord[key];
    if (Array.isArray(value)) {
      value.forEach(
        (v) =>
          v != null && String(v).trim() !== "" && params.append(key, String(v)),
      );
    } else if (value) {
      params.set(key, String(value));
    }
  }

  return params;
};

export const getValidatedFilterSearchParams = (
  searchParams: TFilterSearchParams,
): { params: TValidatedFilterSearchParams; needsRedirect: boolean } => {
  let needsRedirect = false;
  let isValidPrice = false;
  const params = { ...searchParams };

  const { page, sort, price, view } = searchParams;
  let pageNum = parseInt(String(page), 10);

  if (isNaN(pageNum) || pageNum < 1) {
    pageNum = 1;
    if (page && String(page) !== "1") {
      needsRedirect = true;
    }
  }
  params.page = String(pageNum);

  if (Array.isArray(sort) || !sortValues.includes(sort as TSortValue)) {
    params.sort = "default";
    if (sort && sort !== "default") {
      needsRedirect = true;
    }
  } else {
    params.sort = String(sort);
  }

  if (Array.isArray(price) && price.length === 2) {
    const min = Number(price[0]);
    const max = Number(price[1]);

    isValidPrice =
      !isNaN(min) &&
      !isNaN(max) &&
      min >= 0 &&
      max <= SLIDER_MAX_PRICE &&
      min < max;

    if (isValidPrice) {
      params.price = [String(min), String(max)];
    }
  }

  if (!isValidPrice && price) {
    params.price = ["0", `${SLIDER_MAX_PRICE}`];
    needsRedirect = true;
  }

  if (view !== "grid" && view !== "list") {
    params.view = "grid";
    if (view) needsRedirect = true;
  } else {
    params.view = String(view);
  }

  return { params: params as TValidatedFilterSearchParams, needsRedirect };
};

export const normalizeString = (text?: string | null): string => {
  return (text || "").trim().toLowerCase();
};

export const checkShippingAddressesEqual = (
  address1: Partial<TShippingAddress> | null,
  address2: Partial<TShippingAddress> | null,
): boolean => {
  if (address1 === address2) return true;
  if (!address1 || !address2) return false;

  if (normalizeString(address1.name) !== normalizeString(address2.name))
    return false;

  const addr1 = address1.address;
  const addr2 = address2.address;

  if (!!addr1 !== !!addr2) return false;

  if (addr1 && addr2) {
    return Object.keys(addr1).every(
      (key) =>
        normalizeString(addr1[key as keyof typeof addr1]) ===
        normalizeString(addr2[key as keyof typeof addr2]),
    );
  }
  return true;
};

export const handleErrorResponse = <T = unknown>(
  error: unknown,
  defaultMessage: string,
): TActionResult<T> => {
  console.error(error);
  let message = defaultMessage;

  if (error instanceof Error || error instanceof AuthError) {
    message = error.message || defaultMessage;
  }
  return { success: false, message };
};

export const generateUniqueId = async (
  prefix = "",
  length = 8,
  checkUnique?: (id: string) => Promise<boolean>,
  alphabet = "0123456789",
): Promise<string> => {
  let id;

  do {
    id = `${prefix}${customAlphabet(alphabet, length)()}`;
    if (checkUnique && (await checkUnique(id))) {
      continue;
    }
    break;
  } while (true);

  return id;
};

export const calculatePagination = (
  pageParam: string | number | undefined,
  itemsPerPage: number,
): { currentPage: number; offset: number } => {
  const page = parseInt(String(pageParam), 10) || 1;
  const currentPage = Math.max(1, page);
  const offset = (currentPage - 1) * itemsPerPage;

  return { currentPage, offset };
};

export const getSortOption = (sort: string): SQL => {
  const SORT_OPTIONS: Record<string, SQL> = {
    default: sql`name ASC`,
    rating: sql`rating DESC`,
    price_asc: sql`COALESCE(discountPrice, regularPrice) ASC`,
    price_desc: sql`COALESCE(discountPrice, regularPrice) DESC`,
    latest: sql`createdAt DESC`,
  };
  return SORT_OPTIONS[sort] || SORT_OPTIONS.default;
};

export const validateOrderStatus = (
  status: string | undefined,
): TOrder["status"] | "all" => {
  const validStatuses: (TOrder["status"] | "all")[] = [
    "all",
    "pending",
    "delivered",
    "refunded",
  ];

  return status && validStatuses.includes(status as TOrder["status"] | "all")
    ? (status as TOrder["status"] | "all")
    : "all";
};

export const getTotalCount = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any,
  conditions?: SQL<unknown>,
): Promise<number> => {
  const total = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(table)
    .where(conditions);

  return total[0]?.count ?? 0;
};
