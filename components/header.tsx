import Link from 'next/link';
import { useContext } from 'react';
import { HeaderFooterContext } from '../context/headerFooterContext';

export default function Header() {
  const { data } = useContext(HeaderFooterContext);
  const { header } = data;
  console.log('Header Menu - ', header);
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
      <ul className="mb-3 flex bg-[#c5c5c5] p-2 font-bold uppercase tracking-wide transition-all delay-300 duration-300 ease-in-out ">
        {headerMenuItems.length
          ? headerMenuItems.map((menuItem) => (
              <li
                key={menuItem?.ID}
                className="px-3 transition delay-75 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
              >
                <Link
                  href={menuItem?.url || '/'}
                  dangerouslySetInnerHTML={{ __html: menuItem.title }}
                />
              </li>
            ))
          : null}
      </ul>
    </>
  );
}
