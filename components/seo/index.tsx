import { NextSeo } from 'next-seo';
import { ISeoRes } from '../../interfaces/seo.interfaces';

/**
 * Custom SEO component
 *
 * Used to seo meta tags for each page
 *
 * @param {Object} seo Seo.
 * @param {string} uri Page URI.
 * @see https://www.npmjs.com/package/next-seo
 *
 * @returns {JSX.Element}
 *
 */
const Seo = ({ seo, uri }: { seo: ISeoRes; uri: string }) => {
  // console.log('seo, uri',seo, uri);
  if (!seo) {
    return;
  }
  const {
    title = '',
    metaDesc = '',
    metaRobotsNoindex = '',
    metaRobotsNofollow = '',
    opengraphDescription = '',
    opengraphTitle = '',
    opengraphImage = { sourceUrl: '' },
    opengraphSiteName = '',
  } = seo;
  // console.log('seo', seo);

  // window.location.origin - get the address of the current page
  const currentLocation =
    typeof window !== 'undefined' ? window.location.origin : null;
  const opengraphUrl =
    (process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : currentLocation) + uri;

  return (
    <NextSeo
      title={title}
      description={opengraphDescription || metaDesc}
      canonical={opengraphUrl}
      noindex={false}
      nofollow={false}
      openGraph={{
        type: 'website',
        locale: 'ru_RU',
        url: opengraphUrl,
        title: opengraphTitle,
        description: opengraphDescription,
        images: [
          {
            url: opengraphImage?.sourceUrl,
            width: 1280,
            height: 720,
          },
        ],
        site_name: opengraphSiteName,
      }}
      twitter={{
        handle: '@Zhu_koff',
        site: '@Zhu_koff',
        cardType: 'summary_large_image',
      }}
    />
  );
};

export default Seo;
