import Image from '../image';

const CheckoutCartItem = ({ item }) => {
  const productImg = item?.data?.images?.[0] ?? '';
  const currency = item?.currency === 'Br' ? 'руб.' : '';

  return (
    <tr className="woo-next-cart-item" key={item?.productId ?? ''}>
      <td className="woo-next-cart-element">
        <figure>
          <Image
            width="50"
            height="50"
            alt={productImg?.alt ?? ''}
            src={productImg?.src ? productImg?.src : ''} // use normal <img> attributes as props
          />
        </figure>
      </td>
      <td className="woo-next-cart-element">{item?.data?.name ?? ''}</td>
      <td className="woo-next-cart-element">{`${item?.line_subtotal.toFixed(
        2
      )} ${currency}`}</td>
    </tr>
  );
};

export default CheckoutCartItem;
