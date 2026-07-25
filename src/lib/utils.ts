import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(path = "") {
  return `https://infotechssolutions.ca${path}`;
}

export function getService(slug: string) {
  return import("./data").then(({ services }) => services.find((service) => service.slug === slug));
}

export function getProject(slug: string) {
  return import("./data").then(({ projects }) => projects.find((project) => project.slug === slug));
}
