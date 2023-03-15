import Container from './container';
import { useContext, useEffect, useState } from 'react';
import { HeaderFooterContext } from '../context/headerFooterContext';
import Link from 'next/link';

const footerNav = {
  Company: [
    {
      title: 'About Us',
      href: '/#',
    },
    { title: 'Contact Us', href: '/#' },
    { title: 'Newsroom', href: '/#' },
    { title: 'FAQ', href: '/#' },
  ],
  'Job Seeker': [
    {
      title: 'Jobs by Specialisation',
      href: '/#',
    },
    { title: 'Jobs by Location', href: '/#' },
    { title: 'Jobs by Type', href: '/#' },
    { title: 'Jobs by Experience Level', href: '/#' },
    { title: 'Companies', href: '/#' },
    { title: 'Advice', href: '/#' },
  ],
};

// const SocialLinks = [
//   {
//     title: "Instagram",
//     link: "https://instagram.com/",
//     Icon: <InstagramIcon height={30} width={30} />,
//   },
//   {
//     title: "Facebook",
//     link: "https://facebook.com/",
//     Icon: <FacebookIcon height={30} width={30} />,
//   },
//   {
//     title: "Tiktok",
//     link: "https://tiktok.com/",
//     Icon: <TiktokIcon height={30} width={30} />,
//   },
//   {
//     title: "LinkedIn",
//     link: "https://linkedin.com/",
//     Icon: <LinkedInIcon height={30} width={30} />,
//   },
//   {
//     title: "Youtube",
//     link: "https://youtube.com/",
//     Icon: <YoutubeIcon height={30} width={30} />,
//   },
// ];

import { getIconComponentByName } from '../lib/helpers';
import { isArray } from 'lodash';

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

  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <footer className="border-t border-accent-2 bg-accent-1">
      <Container>
        <div className="flex flex-col items-center pt-12 lg:flex-row">
        <div className="mx-auto px-6 pt-16 sm:px-8">
          <div className="xs:grid-cols-2 grid grid-cols-1 gap-y-6 gap-x-6 md:!grid-cols-4 md:gap-8">
            <div className="xs:col-span-2  mb-4 flex flex-col">
              <span className="text-xl font-bold capitalize">Blog.</span>
              <p className="max-w-screen-xs mt-4 text-sm">
                Блог и небольшой магазин товаров с корзиной и возможностью
                заказать их
              </p>
            </div>

            {isArray(footerMenuItems) && footerMenuItems.map(({ title, children }) => {
              return (
                <div key={title}>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {children.map((child) => (
                      <li key={child.title}>
                        <Link
                          href={child.url}
                          className="transition-all duration-150 hover:text-brand-orange hover:underline"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

          </div>
            {/* Social Links */}
            <div className="flex flex-col space-y-2 mt-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Я в социальных сетях
              </h2>
              {socialLinks && socialLinks.length ? (
                <ul className="mb-3 flex flex-wrap p-2 font-bold tracking-wide transition-all delay-300 duration-300 ease-in-out ">
                  {socialLinks.map((linkItem) => (
                    <li
                      key={linkItem?.iconName}
                      className="mr-2 px-3 transition delay-75 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:text-orange-600"
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
            id="footer-copyright"
            className="mt-2 border-t border-slate-200 py-4"
          >
            <Link
              href={'https://github.com/Zhuk-off'}
              className="font-semibold hover:text-brand-orange hover:underline"
              target={'_blank'}
            >
              <div
                className="text-center text-sm "
                dangerouslySetInnerHTML={{
                  __html:
                    copyrightText && typeof copyrightText === 'string'
                      ? copyrightText
                      : null,
                }}
              />
            </Link>
          </div>
        </div>
        </div>
      </Container>
    </footer>
  );
}
