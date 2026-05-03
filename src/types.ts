export enum AppStep {
  SCAN,
  REVIEW,
  PAYMENT,
  SUCCESS
}

export type ProductId = 'kake_udon' | 'kitsune_udon' | 'tempura' | 'onigiri' | 'inari' | 'tea';

export interface Product {
  id: ProductId;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: ProductId;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
