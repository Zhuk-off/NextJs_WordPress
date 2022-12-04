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
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <div className="flex justify-between">
        {headerMenuItems && headerMenuItems.length ? (
          <ul className="flex flex-wrap font-bold uppercase leading-10 tracking-wide transition-all delay-300 duration-300 ease-in-out ">
            {headerMenuItems.map((menuItem) => (
              <li
                key={menuItem?.ID}
                className="px-3 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
              >
                <Link
                  href={menuItem?.url || '/'}
                  dangerouslySetInnerHTML={{ __html: menuItem.title }}
                />
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex">
          <div className="flex cursor-pointer flex-col items-center px-3 font-semibold transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105">
            <User />
            User
          </div>
          <div className="flex cursor-pointer flex-col items-center px-3 font-semibold transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105">
            <Wishlist />
            Wishlist
          </div>
          <Link href={'/cart'}>
            <div className="flex cursor-pointer flex-col items-center px-3 font-semibold transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105">
              <Bag className="mr-1 lg:mr-0" />
              <span className="ml-1">
                Bag{cart?.totalQty ? `(${cart?.totalQty})` : null}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
