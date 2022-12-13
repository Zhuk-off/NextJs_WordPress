export interface IPageResponse {
  id: string;
  title: string;
  slug: string;
  date: string;
  featuredImage: INode | null;
  uri: string;
  content: string;
}

interface INode {
  node: {
    sourceUrl: string;
  };
}
