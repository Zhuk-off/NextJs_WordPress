import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartCounter';
import { IProduct } from '../../interfaces/products.interface';
import { addToCart } from '../../utils/cart';
import cx from 'classnames';
import Link from 'next/link';

export const AddToCart = ({ product }: { product: IProduct }) => {
  if (!product || Object.keys(product).length === 0) {
    return null;
  }

  const [cart, setCart] = useContext(CartContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false); // нужно для показа рядом кнопки посмотреть в корзине, чтобы он мог кликнуть по ней и перейди в корзину
  const [loading, setLoading] = useState(false); // для показа того, что товар добавляется в корзину

  /** мы хотим сделать кнопку неактивной пока идет запрос и чтобы она была серой*/
  const addToCartBtnClasses = cx(
    'text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow',
    {
      'bg-white hover:bg-gray-100': !loading,
      'bg-gray-200': loading,
    }
  );

  return (
    <div className="flex whitespace-nowrap">
      <button
        className="rounded-sm border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 hover:bg-gray-100"
        onClick={() =>
          addToCart(product?.id ?? 0, 1, setCart, setIsAddedToCart, setLoading)
        }
        disabled={loading}
      >
        {loading ? 'Добавляется...' : 'Купить'}
      </button>

      {isAddedToCart && !loading ? (
        <Link
          href={'/cart'}
          className="ml-4 rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
        >
          Оформить
        </Link>
      ) : null}
    </div>
  );
};

export default AddToCart;
