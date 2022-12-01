import { IProduct } from '../../interfaces/products.interface';
import { addToCart } from '../../utils/cart';

export const AddToCart = ({ product }: { product: IProduct }) => {
  if (!product || Object.keys(product).length === 0) {
    return null;
  }
  return (
    <>
      <button
        className="rounded-sm border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 hover:bg-gray-100"
        onClick={() => addToCart(product?.id ?? 0)}
      >
        Add to cart
      </button>
    </>
  );
};

export default AddToCart;
