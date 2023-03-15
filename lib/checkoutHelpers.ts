import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { ICart, ICartItem } from '../interfaces/cart.interface';
import { IState } from '../interfaces/countries.interface';
import {
  ICreateTheOrderResponseProps,
  IInputOrder,
} from '../interfaces/order.interface';
import { clearCart } from '../utils/cart';
import { createTheOrder, getCreateOrderData } from '../utils/checkout/order';
import { WOOCOMMERCE_STATES_ENDPOINT } from './constants';
import { isArray, isEmpty } from 'lodash';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from 'next-stripe/client'; // @see https://github.com/ynnoj/next-stripe

/**
 * Handle Other Payment Method checkout.
 *
 * @param input
 * @param products
 * @param setRequestError
 * @param setCart
 * @param setIsOrderProcessing
 * @param setCreatedOrderData
 * @return {Promise<{orderId: null, error: string}|null>}
 */
export const handleOtherPaymentMethodCheckout = async (
  input: IInputOrder,
  products: ICartItem[],
  setRequestError: Dispatch<SetStateAction<string>>,
  setCart: (cart: ICart) => void,
  setIsOrderProcessing: Dispatch<SetStateAction<boolean>>,
  setCreatedOrderData: Dispatch<SetStateAction<{}>>
): Promise<ICreateTheOrderResponseProps> => {
  setIsOrderProcessing(true);
  const orderData = getCreateOrderData(input, products);
  const customerOrderData = await createTheOrder(
    orderData,
    setRequestError,
    ''
  );
  await clearCart(setCart, () => {});
  setIsOrderProcessing(false);

  if (!customerOrderData?.orderId) {
    setRequestError('Clear cart failed');
    return null;
  }

  setCreatedOrderData(customerOrderData);

  return customerOrderData;
};

/**
 * Handle Stripe checkout.
 *
 * 1. Create Formatted Order data.
 * 2. Create Order using Next.js create-order endpoint.
 * 3. Clear the cart session.
 * 4. On success set show stripe form to true
 *
 * @param input
 * @param products
 * @param setRequestError
 * @param setCart
 * @param setIsProcessing
 *
 * @param setCreatedOrderData
 */
export const handleStripeCheckout = async (
  input: IInputOrder,
  products: ICartItem[],
  setRequestError: {
    (value: SetStateAction<string>): void;
    (value: SetStateAction<string>): void;
  },
  setCart: { (cart: ICart): void; (cart: ICart): void },
  setIsProcessing: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  setCreatedOrderData: {
    (value: SetStateAction<{}>): void;
    (arg0: ICreateTheOrderResponseProps): void;
  }
) => {
  setIsProcessing(true);
  const orderData = getCreateOrderData(input, products);
  const customerOrderData = await createTheOrder(
    orderData,
    setRequestError,
    ''
  );
  const cartCleared = await clearCart(setCart, () => {});
  setIsProcessing(false);

  if (isEmpty(customerOrderData?.orderId)) {
    setRequestError('Clear cart failed');
    return null;
  }

  // On success show stripe form. We redirect the user to the payment gateway platform, where he can enter information about the card
  setCreatedOrderData(customerOrderData);
  await createCheckoutSessionAndRedirect(
    products,
    input,
    customerOrderData?.orderId
  );

  return customerOrderData;
};

/**
 * Create Checkout Session and redirect.
 * @param products
 * @param input
 * @param orderId
 * @return {Promise<void>}
 */
const createCheckoutSessionAndRedirect = async (products, input, orderId) => {
  const sessionData = {
    success_url:
      window.location.origin +
      `/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
    cancel_url: window.location.href,
    customer_email: input.billingDifferentThanShipping
      ? input?.billing?.email
      : input?.shipping?.email,
    line_items: getStripeLineItems(products),
    metadata: getMetaData(input, orderId),
    payment_method_types: ['card'],
    mode: 'payment',
  };
  console.log('sessionData', sessionData);
  let session = { id: '' };
  try {
    session = await createCheckoutSession(sessionData);
  console.log('session', session);

  } catch (err) {
    console.log('createCheckout session error', err);
  }
  try {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
  console.log('stripe', stripe);

    if (stripe) {
      stripe.redirectToCheckout({ sessionId: session.id });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get Stripe Line Items
 *
 * @param products
 * @return {*[]|*}
 */
const getStripeLineItems = (products) => {
  if (isEmpty(products) && !isArray(products)) {
    return [];
  }

  return products.map((product) => {
    return {
      quantity: product?.quantity ?? 0,
      name: product?.data?.name ?? '',
      images: [product?.data?.images?.[0]?.src ?? '' ?? ''],
      amount: Math.round((product?.line_subtotal ?? 0) * 100),
      currency: 'usd',
    };
  });
};

/**
 * Get meta data.
 *
 * @param input
 * @param {String} orderId Order Id.
 *
 * @returns {{shipping: string, orderId: String, billing: string}}
 */
export const getMetaData = (input, orderId) => {
  return {
    billing: JSON.stringify(input?.billing),
    shipping: JSON.stringify(
      input.billingDifferentThanShipping
        ? input?.billing?.email
        : input?.shipping?.email
    ),
    orderId,
  };

  // @TODO
  // if ( customerId ) {
  //     metadata.customerId = customerId;
  // }
};

/**
 * Handle Billing Different Than Shipping.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleBillingDifferentThanShipping = (
  input: IInputOrder,
  setInput: Dispatch<SetStateAction<IInputOrder>>,
  target: EventTarget & HTMLInputElement
): void => {
  const newState = {
    ...input,
    [target.name]: !input.billingDifferentThanShipping,
  };
  setInput(newState);
};

/**
 * Handle Create Account.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleCreateAccount = (
  input: IInputOrder,
  setInput: Dispatch<SetStateAction<IInputOrder>>,
  target: EventTarget & HTMLInputElement
): void => {
  const newState = { ...input, [target.name]: !input.createAccount };
  setInput(newState);
};

/**
 * Set states for the country.
 *
 * @param {Object} target Target.
 * @param {Function} setTheStates React useState function to set the value of the states basis country selection.
 * @param {Function} setIsFetchingStates React useState function, to manage loading state when request is in process.
 *
 * @return {Promise<void>}
 */
export const setStatesForCountry = async (
  target: EventTarget & HTMLSelectElement,
  setTheStates: Dispatch<SetStateAction<IState[]>>,
  setIsFetchingStates: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  if ('country' === target.name) {
    setIsFetchingStates(true);

    const countryCode =
      target[target.selectedIndex].getAttribute('data-countrycode');
    const states = await getStates(countryCode);
    setTheStates(states || []);
    setIsFetchingStates(false);
  }
};

/**
 * Get states
 *
 * @param {String} countryCode Country code
 *
 * @returns {Promise<*[]>}
 */
export const getStates = async (
  countryCode: string = ''
): Promise<IState[]> => {
  if (!countryCode) {
    return [];
  }
  try {
    const { data } = await axios.get(WOOCOMMERCE_STATES_ENDPOINT, {
      params: { countryCode },
    });

    return data?.states ?? [];
  } catch (error) {
    return [];
  }
};
