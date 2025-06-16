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
