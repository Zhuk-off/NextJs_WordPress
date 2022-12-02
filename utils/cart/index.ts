import axios from 'axios';
import { CART_ENDPOINT } from '../../lib/constants';
import { getApiCartConfig } from './api';
import { getSession, storeSession } from './session';

/**
 * Add To Cart Request Handler.
 *
 * @param {int} productId Product Id.
 * @param {int} qty Product Quantity.
 * @param {Function} setCart
 * @param {Function} setIsAddedToCart
 * @param {Function} setLoading
 *
 */

export const addToCart = (
  productId,
  qty = 1,
  setCart,
  setIsAddedToCart,
  setLoading
) => {
  const storedSession = getSession();
  const addOrViewCartConfig = getApiCartConfig();

  setLoading(true);

  axios
    .post(
      CART_ENDPOINT,
      {
        product_id: productId,
        quantity: qty,
      },
      addOrViewCartConfig
    )
    .then((res) => {
      if (
        !storedSession ||
        !storedSession.length ||
        storedSession.length !== 0
      ) {
        storeSession(res?.headers?.['x-wc-session']);
      }
      setIsAddedToCart(true);
      setLoading(false);
      viewCart(setCart);
    })
    .catch((err) => {
      setLoading(false);
      console.log('err', err);
    });
};

/**
 * View Cart Request Handler
 * тут мы хотим посчитать общую сумму корзины
 */
export const viewCart = (setCart) => {
  const addOrViewCartConfig = getApiCartConfig();

  axios
    .get(CART_ENDPOINT, addOrViewCartConfig)
    .then((res) => {
      const formattedCartData = getFormattedCartData(res?.data ?? []);
      setCart(formattedCartData);
    })
    .catch((err) => {
      console.log('err', err);
    });
};

/**
 * Calculate Cart Qty And Price
 *
 * @param cartItems
 * @return {{totalQty: number, totalPrice: number}}
 */

// cartItems - массив элементов корзины
const calculateCartQtyAndPrice = (cartItems) => {
  const qtyAndPrice = {
    totalQty: 0,
    totalPrice: 0,
  };

  if (!Array.isArray(cartItems) || !cartItems.length) {
    return qtyAndPrice;
  }

  // пробегаем по всем элементам корзины и считаем все количество и всю сумму
  cartItems.forEach((item, index) => {
    qtyAndPrice.totalQty += item?.quantity ?? 0;
    qtyAndPrice.totalPrice += item?.line_total ?? 0;
  });

  return qtyAndPrice;
};

// Возвращает нам объект товаров в корзине, дополненный общим количеством и суммой
/**
 * Get Formatted Cart Data.
 *
 * @param cartData
 * @return {null|{cartTotal: {totalQty: number, totalPrice: number}, cartItems: ({length}|*|*[])}}
 */
const getFormattedCartData = (cartData) => {
  if (!cartData || !cartData.length) {
    return null;
  }
  const cartTotal = calculateCartQtyAndPrice(cartData || []);
  return {
    cartItems: cartData || [],
    ...cartTotal,
  };
};
