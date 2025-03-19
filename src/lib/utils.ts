import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: string) {
  if (str && str !== "N/A" && typeof str === "string") {
    return str
      .toLowerCase()
      .replace(/[-_]/g, " ")
      .replace(
        /(^|\s)([a-záéíóúüñ])/g,
        (_, boundary, char) => boundary + char.toUpperCase()
      );
  }
}
