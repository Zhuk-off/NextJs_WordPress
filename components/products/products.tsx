import { IProduct } from '../../interfaces/products.interface';
import Product from './product';

const Products = ({ products }: { products: IProduct[] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="-mx-2 flex flex-wrap overflow-hidden">
      {products.length
        ? products.map((product) => {
            return <Product key={product.id} product={product} />;
          })
        : null}
    </div>
  );
};

export default Products;
