export interface SaleItem {
  name: string[];
  displayName: string[];
  lastPrice: string[];
  finalPrice: string[];
  productPromotions: string[];
  saleRemainingTime: string[];
  saleExpiresAt: string[];
  discount?: string;
  priceDifference?: string;
}

export interface SaleItemAttributes {
  [key: string]: unknown;
}
