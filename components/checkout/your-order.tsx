import CheckoutCartItem from './checkout-cart-item';

const YourOrder = ({ cart }) => {
  const currency = cart?.cartItems?.[0]?.currency === 'Br' ? 'руб.' : '';

  return (
    <>
      {cart ? (
        <>
          {/*Product Listing*/}
          <table className="checkout-cart table-hover mb-10 table w-full">
            <thead>
              <tr className="woo-next-cart-head-container text-left">
                <th className="woo-next-cart-heading-el" scope="col" />
                <th className="woo-next-cart-heading-el" scope="col">
                  Товар
                </th>
                <th
                  className="woo-next-cart-heading-el whitespace-nowrap text-center"
                  scope="col"
                >
                  Кол-во
                </th>
                <th className="woo-next-cart-heading-el" scope="col">
                  Итого
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.cartItems?.length &&
                cart.cartItems.map((item, index) => (
                  <CheckoutCartItem
                    key={item?.productId ?? index}
                    item={item}
                  />
                ))}
              {/*Total*/}
              <tr className="bg-gray-200">
                <td className="" />
                <td className="woo-next-checkout-total whitespace-nowrap text-lg font-bold">
                  Итого к оплате
                </td>
                <td className="woo-next-checkout-total text-center text-lg font-bold">
                  {`${cart?.totalQty ?? ''}`}
                </td>
                <td className="woo-next-checkout-total whitespace-nowrap text-lg font-bold">
                  {`${cart?.totalPrice ?? ''} ${currency ?? ''}`}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default YourOrder;
