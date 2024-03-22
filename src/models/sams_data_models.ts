export interface SaleProduct {
  name: string[];
  displayName: string[];
  lastPrice: string[];
  finalPrice: string[];
  productPromotions: string[];
  saleExpiresAt: string[];
  discount?: string;
  priceDifference?: string;
}

export interface ProductAttributes {
  [key: string]: unknown;
}
