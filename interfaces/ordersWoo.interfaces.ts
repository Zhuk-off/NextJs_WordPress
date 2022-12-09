interface IWooOrderPropsBasicData {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: status;
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: IBillingProps;
  shipping: IShippingProps;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string;
  date_paid_gmt: string;
  date_completed: string;
  date_completed_gmt: string;
  cart_hash: string;
  meta_data: IMetaDataProps[];
  line_items: ILineItemProps[];
  tax_lines: ITaxLineProps[];
  shipping_lines: IShippingLineProps[];
  fee_lines: IFeeLineProps[];
  coupon_lines: ICouponLineProps[];
  refunds: IRefundProps[];
  set_paid: boolean;
}

type status =
  | 'pending'
  | 'processing'
  | 'on-hold'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed'
  | 'trash';

export interface IShippingProps {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface IBillingProps extends IShippingProps {
  email: string;
  phone: string;
}

export interface IMetaDataProps {
  id: number;
  key: string;
  value: string;
}

export interface ILineItemProps {
  id?: number;
  name?: string;
  product_id: number;
  variation_id?: number;
  quantity: number;
  tax_class?: string;
  subtotal?: string;
  subtotal_tax?: string;
  total?: string;
  total_tax?: string;
  taxes?: ITaxesProps[];
  meta_data?: IMetaDataProps[];
  sku?: string;
  price?: string;
}

export interface ITaxesProps {
  id: number;
  rate_code: string;
  rate_id: string;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  meta_data: IMetaDataProps[];
}

export interface ITaxLineProps {
  id: number;
  rate_code: string;
  rate_id: string;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  meta_data: IMetaDataProps[];
}

export interface IShippingLineProps {
  id: number;
  method_title: string;
  method_id: string;
  total: string;
  total_tax: string;
  taxes: ITaxesProps[];
  meta_data: IMetaDataProps[];
}

export interface IFeeLineProps {
  id: number;
  name: string;
  tax_class: string;
  tax_status: string;
  total: string;
  total_tax: string;
  taxes: ITaxesProps[];
  meta_data: IMetaDataProps[];
}

export interface ICouponLineProps {
  id: number;
  code: string;
  discount: string;
  discount_tax: string;
  meta_data: IMetaDataProps[];
}

export interface IRefundProps {
  id: number;
  reason: string;
  total: string;
}

interface IWooOrderProps extends IWooOrderPropsBasicData {
  set_paid: boolean;
}

export interface IWooCreateOrder {
  payment_method: string;
  payment_method_title: string;
  set_paid?: boolean;
  billing: IBillingProps;
  shipping: IShippingProps;
  line_items: ILineItemProps[];
  shipping_lines?: IShippingLineProps[];
}

export interface IWooCreateOrderResponse extends IWooOrderPropsBasicData {
  _links: ILinksWooResponse;
}

export interface ILinksWooResponse {
  self: ILinkWooResponse[];
  collection: ILinkWooResponse[];
}

interface ILinkWooResponse {
  href: string;
}
