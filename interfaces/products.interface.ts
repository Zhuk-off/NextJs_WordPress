import { ILinksWooResponse } from './ordersWoo.interfaces';

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type?: TypeProduct;
  status?: StatusProduct;
  featured?: boolean;
  catalog_visibility?: CatalogVisibilityProduct;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual?: boolean;
  downloadable?: boolean;
  downloads: IDownloadProps[];
  download_limit?: number;
  download_expiry?: number;
  external_url: string;
  button_text: string;
  tax_status?: TaxStatus;
  tax_class: string;
  manage_stock?: boolean;
  stock_quantity: number;
  stock_status?: StockStatus;
  backorders?: Backorders;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: any | null;
  sold_individually?: boolean;
  weight: string;
  dimensions: IDimensionsProps;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: ICategoryProps[];
  tags: ITagProps[];
  images: IImageProps[];
  attributes: IAttributeProps[];
  default_attributes: IDefaultAttributesProps[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  meta_data: IMetaDataProps[];

  has_options: boolean;
  _links: ILinksWooResponse;
}

interface IDimensionsProps {
  length: string;
  width: string;
  height: string;
}

interface ICategoryProps {
  id: number;
  name: string;
  slug: string;
}

interface ITagProps extends ICategoryProps {}

interface IImageProps {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

interface IAttributeProps {
  id: number;
  name: string;
  position: number;
  visible?: boolean;
  variation?: boolean;
  options: string[];
}

type TypeProduct = 'simple' | 'grouped' | 'external' | 'variable';
type StatusProduct = 'draft' | 'pending' | 'private' | 'publish';
type CatalogVisibilityProduct = 'visible' | 'catalog' | 'search' | 'hidden';
type TaxStatus = 'taxable' | 'shipping' | 'none';
type StockStatus = 'instock' | 'outofstock' | 'onbackorder';
type Backorders = 'no' | 'notify' | 'yes';

export interface IDownloadProps {
  id: string;
  name: string;
  file: string;
}

export interface IDefaultAttributesProps {
  id: number;
  name: string;
  option: string;
}

export interface IMetaDataProps {
  id: number;
  key: string;
  value: string;
}
