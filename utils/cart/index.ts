import axios from 'axios';
import { CART_ENDPOINT } from '../../lib/constants';
import { getApiCartConfig } from './api';
import { getSession, storeSession } from './session';

/**
 * Add To Cart Request Handler.
 *
 * @param {int} productId Product Id.
 * @param {int} qty Product Quantity.
 *
 */

export const addToCart = (productId, qty = 1) => {
  const storedSession = getSession();
  const addOrViewCartConfig = getApiCartConfig();

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

      viewCart();
    })
    .catch((err) => {
      console.log('err', err);
    });
};

/**
 * View Cart Request Handler
 */
export const viewCart = () => {
  const addOrViewCartConfig = getApiCartConfig();

  axios
    .get(CART_ENDPOINT, addOrViewCartConfig)
    .then((res) => {
      console.log('res', res);
    })
    .catch((err) => {
      console.log('err', err);
    });
};
