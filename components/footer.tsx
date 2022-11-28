import Container from './container';
import { EXAMPLE_PATH } from '../lib/constants';
import { useContext } from 'react';
import { HeaderFooterContext } from '../context/headerFooterContext';
import { sanitize } from '../utils/miscellaneous';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from './icons';
import { getIconComponentByName } from '../lib/helpers';

export default function Footer() {
  const { data } = useContext(HeaderFooterContext);
  const { footer } = data;
  const {
    copyrightText,
    footerMenuItems,
    sidebarOne,
    sidebarTwo,
    socialLinks,
  } = footer || {};
  // console.log('Footer Menu - ', footer);
  // console.log(footerMenuItems.length);
  // console.log(footerMenuItems);

  return (
    <footer className="border-t border-accent-2 bg-accent-1">
      <Container>
        <div className="flex flex-col items-center py-28 lg:flex-row">
          <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl">
            Statically Generated with Next.js.
          </h3>

          {/* Widget one */}
          <div className="my-1 w-full overflow-hidden px-1 sm:w-full lg:w-1/2 xl:w-1/3">
            <div dangerouslySetInnerHTML={{ __html: sanitize(sidebarOne) }} />
          </div>

          {/* Widget two */}
          <div className="my-1 w-full overflow-hidden px-1 sm:w-full lg:w-1/2 xl:w-1/3">
            <div dangerouslySetInnerHTML={{ __html: sanitize(sidebarTwo) }} />
          </div>

          {/* Footer Menus */}
          <div className="my-1 w-full overflow-hidden px-1 sm:w-full lg:w-1/2 xl:w-1/3">
            {footerMenuItems && footerMenuItems.length ? (
              <ul className="mb-3 flex flex-wrap bg-[#c5c5c5] p-2 font-bold uppercase tracking-wide transition-all delay-300 duration-300 ease-in-out ">
                {footerMenuItems.map((menuItem) => (
                  <li
                    key={menuItem?.ID}
                    className="px-3 transition delay-75 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
                  >
                    <Link
                      href={menuItem?.url || '/'}
                      dangerouslySetInnerHTML={{ __html: menuItem.title }}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Social Links */}
          <div className="w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
            {socialLinks && socialLinks.length ? (
              <ul className="mb-3 flex flex-wrap p-2 font-bold tracking-wide text-blue-500 transition-all delay-300 duration-300 ease-in-out ">
                {socialLinks.map((linkItem) => (
                  <li
                    key={linkItem?.iconName}
                    className="mr-2 px-3 transition delay-75 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:text-blue-600"
                  >
                    <div className="flex-col ">
                      <Link href={linkItem?.iconUrl || '/'} target="_blank">
                        {getIconComponentByName(linkItem?.iconName, 70)}

                        {linkItem.iconName}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Copyright Text */}
          <div
            className="w-full md:w-1/2 lg:w-1/4 "
            dangerouslySetInnerHTML={{
              __html:
                copyrightText && typeof copyrightText === 'string'
                  ? copyrightText
                  : null,
            }}
          />
        </div>
      </Container>
    </footer>
  );
}
