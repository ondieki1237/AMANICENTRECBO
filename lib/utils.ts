import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBackendUrl() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://amani.codewithseth.co.ke';
  // Remove trailing slash if present
  return url.replace(/\/$/, '');
}
