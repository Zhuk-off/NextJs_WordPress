import { useState, useEffect, createContext } from 'react';
import { ICart } from '../interfaces/cart.interface';

const context: [ICart, (cart: ICart) => void] = [
  { cartItems: [], totalPrice: 0, totalQty: 0 },
  (): void => {},
];

export const CartContext = createContext(context);

export const CartCountProvider = (props) => {
  const [cart, setCart] = useState(null);

  /**
   * This will be called once on initial load ( component mount ).
   *
   * Sets the cart data from localStorage to `cart` in the context.
   */
  useEffect(() => {
    if (typeof window) {
      let cartData = localStorage.getItem('next-cart');
      cartData = cartData !== null ? JSON.parse(cartData) : '';
      setCart(cartData);
    }
  }, []);

  /**
   * 1.When setCart() is called that changes the value of 'cart',
   * this will set the new data in the localStorage.
   *
   * 2.The 'cart' will anyways have the new data, as setCart()
   * would have set that.
   */
  useEffect(() => {
    if (typeof window) {
      localStorage.setItem('next-cart', JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};
