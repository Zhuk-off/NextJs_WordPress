import { IProduct } from '../../interfaces/products.interface';
import Product from './product';

const Products = ({ products }: { products: IProduct[] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="-mx-2 flex flex-wrap gap-y-16 overflow-hidden pb-24 pt-14">
      {products.length
        ? products.map((product) => {
            return <Product key={product.id} product={product} />;
          })
        : null}
    </div>
  );
};

export default Products;
