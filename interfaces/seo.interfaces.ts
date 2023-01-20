export interface ISeoRes {
  breadcrumbs: IBreadcrumbs[];
  canonical: string;
  cornerstone: boolean;
  focuskw: string;
  metaDesc: string;
  metaKeywords: string;
  metaRobotsNofollow: string;
  metaRobotsNoindex: string;
  opengraphAuthor: string;
  opengraphDescription: string;
  opengraphImage: IOpengraphImage;
  opengraphModifiedTime: string;
  opengraphPublishedTime: string;
  opengraphPublisher: string;
  opengraphSiteName: string;
  opengraphTitle: string;
  opengraphType: string;
  opengraphUrl: string;
  readingTime: number;
  schemaDetails: string;
  title: string;
  twitterDescription: string;
  twitterImage: { sourceUrl: string | null; title: string | null };
  twitterTitle: string;
}

interface IOpengraphImage {
  altText?: string;
  sourceUrl: string;
  title?: string;
}

export interface IBreadcrumbs {
  text: string;
  url: string;
}

// Product Seo
export interface IYoastHeadJson {
  article_modified_time: string;
  canonical: string;
  description: string;
  og_description: string;
  og_image: IYoastImage[];
  og_locale: string;
  og_site_name: string;
  og_title: string;
  og_type: string;
  og_url: string;
  robots: IRobotsYoast;
  schema: ISchemaYoast;
  title: string;
  twitter_card: string;
  twitter_misc: { 'Примерное время для чтения': string };
}

export interface IYoastImage {
  height: number;
  width: number;
  type: string;
  url: string;
}

export interface IRobotsYoast {
  follow: string;
  index: string;
  'max-image-preview': string;
  'max-snippet': string;
  'max-video-preview': string;
}
export interface ISchemaYoast {
  '@context': string;
  '@graph': [IWebPageItemPage, IBreadcrumbList, IWebSite, IOrganization];
}
export interface IWebPageItemPage {
  '@id': string;
  '@type': ['WebPage', 'ItemPage'];
  breadcrumb: { '@id': string };
  dateModified: string;
  datePublished: string;
  description: string;
  inLanguage: string;
  isPartOf: { '@id': string };
  name: string;
  potentialAction: IpotentialAction[];
  url: string;
}

export interface IBreadcrumbList {
  '@id': string;
  '@type': 'BreadcrumbList';
  itemListElement: IitemListElementBreadcrumbList[];
}

export interface IWebSite {
  '@id': string;
  '@type': 'WebSite';
  alternateName: string;
  description: string;
  inLanguage: string;
  name: string;
  potentialAction: IpotentialAction[];
  publisher: { '@id': string };
  url: string;
}
export interface IOrganization {
  '@id': string;
  '@type': 'Organization';
  alternateName: string;
  image: { '@id': string };
  logo: ILogo;
  name: string;
  url: string;
}

interface ILogo {
  '@id': string;
  '@type': 'ImageObject';
  caption: string;
  contentUrl: string;
  height: number;
  inLanguage: string;
  url: string;
  width: number;
}
interface IpotentialAction {
  '@type': 'ReadAction';
  'query-input'?: string;
  target: string[] | { '@type': 'EntryPoint'; urlTemplate: string };
}

interface IitemListElementBreadcrumbList {
  '@type': 'ListItem';
  item?: string;
  name: string;
  position: number;
}
