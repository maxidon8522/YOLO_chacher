export enum AppStep {
  SCAN,
  REVIEW,
  PAYMENT,
  SUCCESS
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
