import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (img: string) => {
  if (!img) return "";

  // Si ya es una URL externa → NO tocar
  if (img.startsWith("http")) {
    return img;
  }

  // Si es local → agregar base
  return `${import.meta.env.BASE_URL}${img.replace(/^\/+/, "")}`;
};