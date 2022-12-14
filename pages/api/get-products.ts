import { IProduct } from '../../interfaces/products.interface';
import { modifyUrlBackendToFrontendWC } from '../../lib/helpers';

const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: 'wc/v3',
});

type ResponseData = {
  success: boolean;
  products: IProduct[];
  error: string;
};

export default async function handler(req, res) {
  const responseData: ResponseData = {
    success: false,
    products: [],
    error: '',
  };

  const { perPage } = req?.query ?? {};

  try {
    const { data }: { data: IProduct[] } = await api.get('products', {
      per_page: perPage || 50,
    });
    responseData.success = true;
    responseData.products = modifyUrlBackendToFrontendWC(data);

    res.json(responseData);
  } catch (error) {
    responseData.error = error.message;
    res.status(500).json(responseData);
  }
}
