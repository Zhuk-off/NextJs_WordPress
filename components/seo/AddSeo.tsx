import { FAQPageJsonLd, NextSeo } from 'next-seo';
import { ISeoRes, IYoastHeadJson } from '../../interfaces/seo.interfaces';

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
const Seo = ({ seo, uri }: { seo: ISeoRes | IYoastHeadJson; uri: string }) => {
  if (!seo) {
    return;
  }

  function isYoastHeadJson(
    seo: ISeoRes | IYoastHeadJson
  ): seo is IYoastHeadJson {
    return 'robots' in seo; //если роль есть в объекте user, то это admin
  }
  // Change type metaRobotsNoindex, metaRobotsNofollow
  function changeTypeNoIndexNoFollow(noIndexNoFollow: string) {
    const noIndexBoolean =
      noIndexNoFollow === '' ||
      noIndexNoFollow === 'false' ||
      noIndexNoFollow === 'index' ||
      noIndexNoFollow === 'follow'
        ? false
        : true;
    return noIndexBoolean;
  }
  let metaRobotsNoindexBoolean = false;
  let metaRobotsNofollowBoolean = false;
  if (isYoastHeadJson(seo)) {
    // console.log('IYoastHeadJson', seo);
    metaRobotsNoindexBoolean = changeTypeNoIndexNoFollow(seo?.robots?.index);
    metaRobotsNofollowBoolean = changeTypeNoIndexNoFollow(seo?.robots?.follow);
  } else {
    // console.log('ISeoRes', seo);
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
    // console.log(metaRobotsNoindex);

    metaRobotsNoindexBoolean = changeTypeNoIndexNoFollow(metaRobotsNoindex);
    metaRobotsNofollowBoolean = changeTypeNoIndexNoFollow(metaRobotsNofollow);
  }
  // console.log('uri', uri);

  // window.location.origin - get the address of the current page
  const currentLocation =
    typeof window !== 'undefined' ? window.location.origin : null;
  const opengraphUrl =
    (process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : currentLocation) + uri;

  return (
    <>
      {isYoastHeadJson(seo) ? (
        <NextSeo
          title={seo.title}
          description={seo.og_description || seo.description}
          canonical={seo.canonical}
          noindex={metaRobotsNoindexBoolean}
          nofollow={metaRobotsNofollowBoolean}
          openGraph={{
            type: 'website',
            locale: 'ru_RU',
            url: seo.og_url,
            title: seo.og_title,
            description: seo.og_description,
            images: seo.og_image,
            site_name: seo.schema['@graph'][2].name,
          }}
          // twitter={{
          //   handle: '@Zhu_koff',
          //   site: '@Zhu_koff',
          //   cardType: 'summary_large_image',
          // }}
        />
      ) : (
        <NextSeo
          title={seo.title}
          description={seo.opengraphDescription || seo.metaDesc}
          canonical={seo.canonical}
          noindex={metaRobotsNoindexBoolean}
          nofollow={metaRobotsNofollowBoolean}
          openGraph={{
            type: 'website',
            locale: 'ru_RU',
            url: seo.opengraphUrl,
            title: seo.opengraphTitle,
            description: seo.opengraphDescription,
            images: [
              {
                url: seo.opengraphImage?.sourceUrl,
                width: 1280,
                height: 720,
              },
            ],
            site_name: seo.opengraphSiteName,
          }}
          // twitter={{
          //   handle: '@Zhu_koff',
          //   site: '@Zhu_koff',
          //   cardType: 'summary_large_image',
          // }}
        />
      )}
    </>
  );
};

export default Seo;
