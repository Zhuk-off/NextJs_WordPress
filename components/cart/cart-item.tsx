import React, { useEffect, useState, useRef } from 'react';
import { ICart, ICartItem } from '../../interfaces/cart.interface';
import { deleteCartItem, updateCart } from '../../utils/cart';
import ImageMod from '../image';

const CartItem = ({
  item,
  products,
  setCart,
}: {
  item: ICartItem;
  products: ICartItem[];
  setCart: (cart: ICart) => void;
}) => {
  const [productCount, setProductCount] = useState(item.quantity);
  const [updatingProductProcess, setUpdatingProductProcess] = useState(false);
  const [removingProduct, setRemovingProduct] = useState(false);
  const productImg = item?.data?.images?.[0] ?? '';

  /**
   * Do not allow state update on an unmounted component.
   *
   * isMounted is used so that we can set it's value to false
   * when the component is unmounted.
   * This is done so that setState ( e.g setRemovingProduct ) in asynchronous calls
   * such as axios.post, do not get executed when component leaves the DOM
   * due to product/item deletion.
   * If we do not do this as unsubscription, we will get
   * "React memory leak warning- Can't perform a React state update on an unmounted component"
   *
   * @see https://dev.to/jexperton/how-to-fix-the-react-memory-leak-warning-d4i
   * @type {React.MutableRefObject<boolean>}
   */
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    // When component is unmounted, set isMounted.current to false.
    return () => {
      isMounted.current = false;
    };
  }, []);

  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {String} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cartKey: string
  ) => {
    event.stopPropagation();

    // If the component is unmounted, or still previous item update request is in process, then return.
    if (!isMounted || updatingProductProcess) {
      return;
    }

    deleteCartItem(cartKey, setCart, setRemovingProduct);
  };

  /*
   * When user changes the qty from product input update the cart in localStorage
   * Also update the cart in global context
   *
   * @param {Object} event event
   *
   * @return {void}
   */

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

      if (products.length) {
        updateCart(item?.key, newQty, setCart, setUpdatingProductProcess);
      }
    }
  };

  const currency = item?.currency === 'Br' ? 'руб.' : '';

  return (
    <div className="cart-item-wrap mb-5 grid grid-cols-3 gap-6 border border-brand-bright-grey p-5">
      <div className="cart-left-col col-span-1">
        <figure>
          <ImageMod
            width="300"
            height="300"
            alt={productImg !== '' ? productImg?.alt ?? '' : ''}
            src={productImg !== '' ? productImg?.src : ''} // use normal <img> attributes as props
          />
        </figure>
      </div>

      <div className="cart-right-col col-span-2">
        <div className="flex h-full flex-col justify-between">
          <div className="cart-product-title-wrap relative">
            <div className="mr-14">
              <h3 className="cart-product-title text-brand-orange">
                {item?.data?.name}
              </h3>
              {item?.data?.description ? <p>{item?.data?.description}</p> : ''}
            </div>
            <button
              className="cart-remove-item absolute right-0 top-0 
              flex items-center 
              border border-brand-bright-grey bg-transparent px-4 py-2 text-22px leading-22px "
              onClick={(event) => handleRemoveProductClick(event, item?.key)}
            >
              <span className="-translate-y-0.5">&times;</span>
            </button>
          </div>

          <footer className="cart-product-footer flex items-center justify-between border-t border-brand-bright-grey p-4">
            <div className="">
              <div className="cart-total-price">
                {`Количество: ${item?.quantity} шт `}
              </div>
              <div className="cart-total-price">
                {`Общая стоимость:`}{' '}
                <span className="font-semibold">{`${item?.line_subtotal.toFixed(
                  2
                )} ${currency}`}</span>
              </div>
            </div>
            {updatingProductProcess ? (
              <img
                className="woo-next-cart-item-spinner"
                width={40}
                height={40}
                src="/cart-spinner.gif"
                alt="spinner"
              />
            ) : null}

            {/*Qty*/}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                className="decrement-btn text-24px"
                onClick={(event) =>
                  handleQtyChange(event, item?.key, 'decrement')
                }
              >
                -
              </button>
              <input
                type="number"
                min="1"
                style={{
                  textAlign: 'center',
                  width: '50px',
                  paddingRight: '0',
                }}
                // data-cart-key={item?.key}
                className={`woo-next-cart-qty-input ml-3 ${
                  updatingProductProcess ? 'disabled' : ''
                } `}
                value={productCount}
                onChange={(event) => handleQtyChange(event, item?.key, '')}
              />
              <button
                className="increment-btn text-20px"
                onClick={(event) =>
                  handleQtyChange(event, item?.key, 'increment')
                }
              >
                +
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
