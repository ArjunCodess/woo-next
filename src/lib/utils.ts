import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateDiscount = (regular: string, sale: string): number => {
  if (!regular || !sale) return 0;
  const regularPrice = parseFloat(regular);
  const salePrice = parseFloat(sale);
  if (regularPrice <= 0 || salePrice <= 0) return 0;
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
};