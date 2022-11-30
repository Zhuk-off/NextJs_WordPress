import Link from 'next/link';
import { IProduct } from '../interfaces/products.interface';
import { sanitize } from '../utils/miscellaneous';
import ImageMod from './image';

const Products = ({ products }: { products: IProduct[] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="-mx-2 flex flex-wrap overflow-hidden">
      {products.length ? products.map((product) => {
        const img = product?.images?.[0];
        return (
          <div
            key={product?.id}
            className="my-2 w-full overflow-hidden px-2 sm:w-1/2 md:w-1/3 xl:w-1/4"
          >
            <Link href={product?.permalink ?? '/'}>
              <ImageMod
                src={img?.src ?? ''}
                alt={img?.alt ?? ''}
                title={product?.name ?? ''}
                width={380}
                height={380}
              />
              <h3 className='font-bold uppercase'>{product?.name ?? ''}</h3>
              <div dangerouslySetInnerHTML={{__html: sanitize(product?.price_html ?? '')}}/>
            </Link>
          </div>
        );
      }):null}
    </div>
  );
};

export default Products;
