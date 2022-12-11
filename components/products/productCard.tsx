import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartCounter';
import { ICartItem } from '../../interfaces/cart.interface';
import { IProduct } from '../../interfaces/products.interface';
import { sanitize } from '../../utils/miscellaneous';
import AddToCart from '../cart/addToCart';
import Qty from '../cart/cart-elements/qty';
import ImageMod from '../image';
import SectionSeparator from '../section-separator';

const ProductCard = ({
  product,
  products,
}: {
  product: IProduct;
  products: IProduct[];
}): JSX.Element => {
  const [cart, setCart] = useContext(CartContext);

  let productToCart: ICartItem[] = null;
  if (cart) {
    const { cartItems } = cart || {};
    productToCart = cartItems.filter(
      (prodCart) => prodCart.product_id === product.id
    );
  }
  const productImg = product.images?.[0] ?? '';

  const relatedProducts: IProduct[] = [];
  const relatedProductsByPrice: IProduct[] = [];

  product.related_ids.forEach((ids) =>
    relatedProducts.push(products.find((prod) => prod.id === ids))
  );

  /**
   * We get a more expensive and cheaper product for display in recommended goods
   */
  if (relatedProducts?.length > 2) {
    relatedProducts.sort(
      (prod1, prod2) => Number(prod1.price) - Number(prod2.price)
    );
    relatedProductsByPrice.push(
      relatedProducts.find((prod) => product.price > prod.price)
    );
    relatedProducts.sort(
      (prod1, prod2) => Number(prod2.price) - Number(prod1.price)
    );
    relatedProductsByPrice.push(
      relatedProducts.find((prod) => product.price < prod.price)
    );
  } else {
    relatedProductsByPrice.push(...relatedProducts);
  }

  return (
    <>
      <h1 className="mb-16 text-3xl font-bold">{product.name}</h1>
      <div className="flex justify-between gap-10 xl:justify-center xl:gap-x-40">
        <div className="w-[250] overflow-hidden object-contain">
          <figure>
            <ImageMod
              width="300"
              height="300"
              alt={productImg !== '' ? productImg?.alt ?? '' : ''}
              src={productImg !== '' ? productImg?.src : ''} // use normal <img> attributes as props
            />
          </figure>
        </div>
        <div className="w-1/2 max-w-screen-sm">
          <div
            className="mb-8"
            dangerouslySetInnerHTML={{
              __html: sanitize(product?.short_description ?? ''),
            }}
          />
          <div className="mb-8 text-2xl font-bold">
            {`Всего: `}
            {Number(product.price).toFixed(2)}
            {` `}
          </div>

          {productToCart &&
          Array.isArray(productToCart) &&
          productToCart.length !== 0 ? (
            <div className="mb-10">
              <Qty productToCart={productToCart[0]} setCart={setCart} />
            </div>
          ) : null}

          <AddToCart product={product} />
        </div>
      </div>
      <SectionSeparator />
      <h3 className="mb-5 text-xl font-semibold">
        Взгляните еще на эти товары:
      </h3>
      {relatedProductsByPrice.length !== 0 ? (
        <div className="cart-item-wrap cursor-pointer border border-brand-bright-grey pt-5 pl-5 pr-5 xl:flex xl:gap-6 2xl:gap-6 ">
          {relatedProductsByPrice.map((prod) => (
            <Link href={prod?.permalink} key={prod?.id}>
              <div className="cart-item-wrap mb-5 cursor-pointer border border-brand-bright-grey p-5 hover:bg-gray-100">
                <div className="cart-left-col col-span-1 flex justify-start gap-10 xl:gap-5 ">
                  <figure className="ml-5 h-[100] w-[100] xl:ml-0 ">
                    <ImageMod
                      className="mb-2 overflow-hidden object-cover mix-blend-darken"
                      width="100"
                      height="100"
                      alt={
                        prod?.images[0]?.alt !== ''
                          ? prod?.images[0]?.alt ?? ''
                          : ''
                      }
                      src={
                        prod?.images[0]?.src !== '' ? prod?.images[0]?.src : ''
                      } // use normal <img> attributes as props
                    />
                  </figure>
                  <div className="xl:max-w-xs 2xl:max-w-md ">
                    <h3 className="cart-product-title text-brand-orange">
                      {prod?.name}
                    </h3>
                    {prod?.description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: sanitize(prod?.description),
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="text-lg font-semibold">{`Цена: ${Number(
                    prod.price
                  ).toFixed(2)} `}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ProductCard;
