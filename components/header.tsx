import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../context/CartCounter';
import { HeaderFooterContext } from '../context/headerFooterContext';
import { Bag, User, Wishlist } from './icons';

export default function Header() {
  const { data } = useContext(HeaderFooterContext);
  const [cart, setCart] = useContext(CartContext);

  const { header } = data;
  const { headerMenuItems, siteDescription, siteTitle, siteLogoUrl, favicon } =
    header || {};

  return (
    <>
      <h2 className="mb-10 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <div className="mb-10 flex justify-between">
        {headerMenuItems && headerMenuItems.length ? (
          <ul
            className="flex flex-wrap items-center 
          text-xl font-bold leading-tight tracking-wide 
          transition-all delay-300 duration-300 ease-in-out 
          md:text-2xl md:tracking-tighter whitespace-nowrap"
          >
            {headerMenuItems.map((menuItem) => (
              <li
                key={menuItem?.ID}
                className="px-3 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:text-brand-orange"
              >
                <Link
                  href={menuItem?.url || '/'}
                  dangerouslySetInnerHTML={{ __html: menuItem.title }}
                />
              </li>
            ))}
          </ul>
        ) : null}
        <div
          className="flex text-lg font-bold leading-tight tracking-wide
        md:text-xl md:tracking-tighter
        "
        >
          <div className="flex cursor-pointer flex-col items-center px-3 font-semibold transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:text-brand-orange">
            <User />
            Войти
          </div>
          <div className="flex cursor-pointer flex-col items-center px-3 font-semibold transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:text-brand-orange">
            <Wishlist />
            Избранное
          </div>
          <Link href={'/cart'} className="h-full">
            <div className="flex h-full cursor-pointer flex-col items-center px-3 font-semibold transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:text-brand-orange">
              <Bag className="mr-1 lg:mr-0" />
              <span className="ml-1">
                Корзина{cart?.totalQty ? `(${cart?.totalQty})` : null}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
