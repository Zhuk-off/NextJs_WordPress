import { ISeoRes } from './seo.interfaces';

export interface IPageResponse {
  id: string;
  title: string;
  slug: string;
  date: string;
  featuredImage: INode | null;
  uri: string;
  content: string;
  seo?: ISeoRes;
}

interface INode {
  node: {
    sourceUrl: string;
  };
}
