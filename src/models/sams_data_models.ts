export interface SaleItem {
  name: string;
  displayName: string;
  lastPrice: string;
  finalPrice: string;
  productPromotions: string;
  saleRemainingTime: string;
  saleExpiresAt: string;
  status: string;
  discount?: string;
  priceDifference?: string;
}

export interface SaleItemRaw {
  name: string[];
  displayName: string[];
  lastPrice: string[];
  finalPrice: string[];
  productPromotions: string[];
  saleRemainingTime: string[];
  saleExpiresAt: string[];
  status: string[];
}
