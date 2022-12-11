import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Container from '../components/container';
import Layout from '../components/layout';
import ErrorPage from 'next/error';
import { HeaderFooterContext } from '../context/headerFooterContext';
import { IHeaderFooterContext } from '../interfaces/footerHeaderRestAPIDataResponse';
import { IPageResponse } from '../interfaces/pages.interfaces';
import {
  getAllPagesSlug,
  getFooterHeaderRestAPIData,
  getPageByUri,
} from '../lib/api';
import { sanitize } from '../utils/miscellaneous';

const Checkout = ({
  dataRest,
  page,
}: {
  dataRest: IHeaderFooterContext;
  page: IPageResponse;
}) => {
  if (!dataRest) return null;
  const router = useRouter();

  const { data } = dataRest;

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <Layout>
        <Container>
          <h1 className="mt-24 mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
            {page.title}
          </h1>
          <div
            className="mb-20"
            dangerouslySetInnerHTML={{ __html: sanitize(page.content) }}
          ></div>
        </Container>
      </Layout>
    </HeaderFooterContext.Provider>
  );
};

export default Checkout;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const dataRest = await getFooterHeaderRestAPIData();
  const page = await getPageByUri(`/${params.page}/`);

  return {
    props: {
      dataRest,
      page,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPagesSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/${node.slug}`) || [],
    fallback: true,
  };
};
