import { sortValues } from "@/data";
import { SLIDER_MAX_PRICE } from "@/lib/constants";
import { TFilterURLSearchParams, TSortValue } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
      value.forEach((v) => {
        if (v !== null && typeof v !== "undefined" && String(v).trim() !== "") {
          params.append(key, String(v));
        }
      });
    } else if (value) {
      params.set(key, String(value));
    }
  }

  return params;
};

export const getValidatedFilterSearchParams = (
  searchParams: TFilterURLSearchParams,
): {
  params: TFilterURLSearchParams;
  needsRedirect: boolean;
} => {
  let needsRedirect = false;
  let isValidPrice = false;

  const params = { ...searchParams };

  const page = searchParams.page;
  let pageNum = parseInt(String(page), 10);

  if (isNaN(pageNum) || pageNum < 1) {
    pageNum = 1;
    if (page && String(page) !== "1") needsRedirect = true;
  }
  params.page = String(pageNum);

  const sort = searchParams.sort;

  if (Array.isArray(sort) || !sortValues.includes(sort as TSortValue)) {
    params.sort = "default";
    if (sort && sort !== "default") needsRedirect = true;
  }

  const price = searchParams.price;

  if (Array.isArray(price) && price.length === 2) {
    const min = Number(price[0]);
    const max = Number(price[1]);

    isValidPrice =
      !isNaN(min) &&
      !isNaN(max) &&
      min >= 0 &&
      max <= SLIDER_MAX_PRICE &&
      min < max;

    if (isValidPrice) params.price = [String(min), String(max)];
  }

  if (!isValidPrice && price) {
    params.price = ["0", `${SLIDER_MAX_PRICE}`];
    needsRedirect = true;
  }

  const view = searchParams.view;

  if (view !== "grid" && view !== "list") {
    params.view = "grid";
    if (view) needsRedirect = true;
  }

  return { params, needsRedirect };
};
