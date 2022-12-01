import Link from 'next/link';
import { sanitize } from '../../utils/miscellaneous';
import ImageMod from '../image';
import { IProduct } from '../../interfaces/products.interface';
import AddToCart from '../cart/addToCart';

const Product = ({ product }: { product: IProduct }) => {
  if (!product || Object.keys(product).length === 0) {
    return null;
  }

  const img = product?.images?.[0];
  const productType = product?.type ?? '';

  return (
    <div className="my-2 w-full overflow-hidden px-2 sm:w-1/2 md:w-1/3 xl:w-1/4">
      <Link href={product?.permalink ?? '/'}>
        <ImageMod
          src={img?.src ?? ''}
          alt={img?.alt ?? ''}
          title={product?.name ?? ''}
          width={380}
          height={380}
        />
        <h3 className="font-bold uppercase">{product?.name ?? ''}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitize(product?.price_html ?? ''),
          }}
        />
      </Link>
      {/* проверяем, если продукт одиночный, он может быть разным(составным, и с выбором цвета)
      то добавляем кнопку "Добавить в корзину" и передаем туда параметром продукт с данными */}
      {productType === 'simple' ? <AddToCart product={product} /> : null}
    </div>
  );
};

export default Product;
