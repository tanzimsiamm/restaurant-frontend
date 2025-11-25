export const SITE_NAME = 'Restaurant Hub';
export const SITE_DESCRIPTION = 'Delicious food delivered to your doorstep';

export const NAVIGATION_LINKS = [
  { label: 'Home', href: '/' },
];
export const ITEMS_PER_PAGE = 12;

export const SORT_OPTIONS = [
  { label: 'Latest', value: '-createdAt' },
  { label: 'Price: Low to High', value: 'price' },
  { label: 'Price: High to Low', value: '-price' },
  { label: 'Name: A to Z', value: 'name' },
  { label: 'Name: Z to A', value: '-name' },
];