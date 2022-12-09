import { useEffect, useState } from 'react';
import { ICart, ICartItem } from '../../../interfaces/cart.interface';
import { updateCart } from '../../../utils/cart';

const Qty = ({
  productToCart,
  setCart,
}: {
  productToCart: ICartItem;
  setCart: (cart: ICart) => void;
}): JSX.Element => {
  const [productCount, setProductCount] = useState(productToCart.quantity);
  const [updatingProductProcess, setUpdatingProductProcess] = useState(false);
  const [removingProduct, setRemovingProduct] = useState(false);
  const { key: keyProd } = productToCart;

  useEffect(() => {
    setProductCount(productToCart.quantity);
  }, [productToCart]);
  const handleQtyChange = (
    event,
    cartKey: string,
    type: 'decrement' | 'increment' | ''
  ) => {
    if (typeof window) {
      event.stopPropagation();
      let newQty: number;

      // If the previous cart request is still updatingProductProcess or removingProduct, then return.
      if (
        updatingProductProcess ||
        removingProduct ||
        ('decrement' === type && 1 === productCount)
      ) {
        return;
      }

      if (type) {
        newQty = 'increment' === type ? productCount + 1 : productCount - 1;
      } else {
        // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
        newQty = event.target.value ? parseInt(event.target.value) : 1;
      }

      // Set the new qty in state.
      setProductCount(newQty);

      updateCart(keyProd, newQty, setCart, setUpdatingProductProcess);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        className="decrement-btn text-24px"
        onClick={(event) => handleQtyChange(event, keyProd, 'decrement')}
      >
        -
      </button>
      {updatingProductProcess ? (
        <div className="flex w-[62px] justify-center">
          <img
            className="woo-next-cart-item-spinner"
            width={36}
            height={36}
            src="/cart-spinner.gif"
            alt="spinner"
          />
        </div>
      ) : (
        <input
          type="number"
          min="1"
          style={{
            textAlign: 'center',
            width: '50px',
            paddingRight: '0',
          }}
          data-cart-key={keyProd}
          className={`woo-next-cart-qty-input ml-3 ${
            updatingProductProcess ? 'disabled' : ''
          } `}
          value={productCount}
          onChange={(event) => handleQtyChange(event, keyProd, '')}
        />
      )}
      <button
        className="increment-btn text-20px"
        onClick={(event) => handleQtyChange(event, keyProd, 'increment')}
      >
        +
      </button>
    </div>
  );
};

export default Qty;
