import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL;

  // elimina slash duplicados
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export const getImageUrl = (img: string) => {
  if (!img) return "";

  if (img.startsWith("http")) return img;

  return withBase(img);
};