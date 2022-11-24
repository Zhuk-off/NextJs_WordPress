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
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <ul >
        {headerMenuItems.length
          ? headerMenuItems.map((menuItem) => (
              <li key={menuItem?.ID}>
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
