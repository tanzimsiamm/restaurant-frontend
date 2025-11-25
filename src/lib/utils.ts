import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function calculateDiscount(price: number, discountPrice?: number): number {
  if (!discountPrice) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function getImageUrl(url: string): string {
  // If it's already a full URL, return it
  if (url.startsWith('http')) return url;
  // Otherwise, construct the full URL (adjust based on your image storage)
  return url;
}