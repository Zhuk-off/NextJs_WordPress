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
