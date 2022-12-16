export interface ISeoRes {
  breadcrumbs: IBreadcrumbs[];
  metaDesc: string;
  metaRobotsNofollow: string;
  metaRobotsNoindex: string;
  opengraphAuthor: string;
  opengraphDescription: string;
  opengraphImage: { sourceUrl: string };
  opengraphModifiedTime: string;
  opengraphPublishedTime: string;
  opengraphSiteName: string;
  opengraphTitle: string;
  schemaDetails: string;
  title: string;
  twitterDescription: string;
  twitterImage: { sourceUrl: string | null };
  twitterTitle: string;
}

export interface IBreadcrumbs {
  text: string;
  url: string;
}
