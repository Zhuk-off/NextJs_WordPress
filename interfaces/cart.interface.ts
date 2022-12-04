import { IProduct } from './products.interface';

export interface ICart {
  cartItems: ICartItem[];
  totalPrice: number;
  totalQty: number;
}

export interface ICartItem {
  currency: string;
  data: IProduct;
  data_hash: string;
  key: string;
  line_subtotal: number;
  line_subtotal_tax: number;
  line_tax: number;
  line_tax_data: ILineTaxData;
  line_total: number;
  product_id: number;
  quantity: number;
  variation: Array<any>;
  variation_id: number;
}

interface ILineTaxData {
  subtotal: Array<any>;
  total: Array<any>;
}
