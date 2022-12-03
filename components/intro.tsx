import { useContext } from 'react';
import { HeaderFooterContext } from '../context/headerFooterContext';
import { CMS_NAME, CMS_URL } from '../lib/constants';

export default function Intro() {
  const { data } = useContext(HeaderFooterContext);
  const { siteLogoUrl, siteTitle } = data.header;
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {siteLogoUrl ? (
          <img src={siteLogoUrl} alt={`${siteTitle} logo`} className='mix-blend-darken'/>
        ) : (
          'Bloggi.'
        )}
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{' '}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{' '}
        and{' '}
        <a
          href={CMS_URL}
          className="underline hover:text-success duration-200 transition-colors"
        >
          {CMS_NAME}
        </a>
        .
      </h4>
    </section>
  );
}
