import { useContext } from 'react';
import { HeaderFooterContext } from '../context/headerFooterContext';
import { CMS_NAME, CMS_URL } from '../lib/constants';

export default function Intro() {
  const { data } = useContext(HeaderFooterContext);
  const { siteLogoUrl, siteTitle } = data.header;
  return (
    <section className="mt-16 mb-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
      <h2 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
        {siteLogoUrl ? (
          <img
            src={siteLogoUrl}
            alt={`${siteTitle} logo`}
            className="mix-blend-darken"
          />
        ) : (
          'Bloggi.'
        )}
      </h2>
      <h4 className="mt-5 text-center text-lg md:pl-8 md:text-left">
        Пример статически сгенерированного блога с использованием{' '}
        <a
          href="https://nextjs.org/"
          className="underline transition-colors duration-200 hover:text-brand-orange"
        >
          Next.js
        </a>{' '}
        и{' '}
        <a
          href={CMS_URL}
          className="underline transition-colors duration-200 hover:text-brand-orange"
        >
          {CMS_NAME}
        </a>
        .
      </h4>
    </section>
  );
}
