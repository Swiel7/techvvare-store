export const protectedRoutes: RegExp[] = [
  /^\/checkout(\/.*)?$/,
  /^\/order-confirmation(\/.*)?$/,
  /^\/account(\/.*)?$/,
  /^\/addresses(\/.*)?$/,
  /^\/orders(\/.*)?$/,
  /^\/wishlist(\/.*)?$/,
];

export const authRoutes: RegExp[] = [/^\/login$/, /^\/register$/];
