import { clsx, type ClassValue } from "clsx";
import { siteConfig } from "@/lib/site-config";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path}`;
}
