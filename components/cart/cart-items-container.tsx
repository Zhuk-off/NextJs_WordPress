import React, { useContext, useState } from 'react';

import Link from 'next/link';
import { clearCart } from '../../utils/cart';
import { CartContext } from '../../context/CartCounter';
import CartItem from './cart-item';

const CartItemsContainer = () => {
  const [cart, setCart] = useContext(CartContext);
  const { cartItems, totalPrice, totalQty } = cart || {};
  const [isClearCartProcessing, setClearCartProcessing] = useState(false); // для спиннера загрузки, когда происходит добавление/удаление/пересчет товаров

  // Clear the entire cart.
  const handleClearCart = (event) => {
    event.stopPropagation();

    if (isClearCartProcessing) {
      return;
    }

    clearCart(setCart, setClearCartProcessing);
  };


    const currency = cartItems?.[0]?.currency === 'Br' ? 'руб.' : '';


  return (
    <div className="content-wrap-cart">
      {cart ? (
        <div className="woo-next-cart-table-row grid gap-4 lg:grid-cols-3">
          {/*Cart Items*/}
          <div className="woo-next-cart-table mb-md-0 mb-5 lg:col-span-2">
            {cartItems.length &&
              cartItems.map((item) => (
                <CartItem
                  key={item.product_id}
                  item={item}
                  products={cartItems}
                  setCart={setCart}
                />
              ))}
          </div>

          {/*Cart Total*/}
          <div className="woo-next-cart-total-container p-5 pt-0 lg:col-span-1">
            <h2 className="font-semibold">Всего к оплате</h2>
            <div className="mb-4 grid grid-cols-3 bg-gray-100">
              <p className="col-span-2 mb-0 p-2 font-bold">Итого({totalQty})</p>
              <p className="col-span-1 mb-0 p-2 font-bold">{`${totalPrice.toFixed(
                2
              )} ${currency}`}</p>
            </div>

            <div className="flex justify-between">
              {/*Clear entire cart*/}
              <div className="clear-cart">
                <button
                  className="mr-2 mb-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  onClick={(event) => handleClearCart(event)}
                  disabled={isClearCartProcessing}
                >
                  <span className="woo-next-cart">
                    {!isClearCartProcessing
                      ? 'Очистить корзину'
                      : 'Очищается...'}
                  </span>
                </button>
              </div>
              {/*Checkout*/}
              <Link href="/checkout">
                <button className="mr-2 mb-2 rounded-lg bg-brand-orange px-5 py-2.5 text-center text-sm font-medium text-white duration-500 hover:bg-brand-royal-blue focus:text-brand-gunsmoke-grey focus:ring-4 dark:focus:ring-yellow-900">
                  <span className="woo-next-cart-checkout-txt">
                    Перейти к оформлению
                  </span>
                  <i className="fas fa-long-arrow-alt-right" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-14">
          <h2 className="mb-5 font-semibold">Корзина пуста</h2>
          <Link href="/">
            <button className="mr-2 mb-2 rounded-lg bg-brand-orange px-5 py-2.5 text-center text-sm font-medium text-white duration-500 hover:bg-brand-royal-blue dark:focus:ring-yellow-900">
              <span className="woo-next-cart-checkout-txt">
                Добавить новых товаров
              </span>
              <i className="fas fa-long-arrow-alt-right" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItemsContainer;
