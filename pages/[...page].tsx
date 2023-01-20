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
import { useEffect, useState } from 'react';
import PostTitle from '../components/post-title';
import Head from 'next/head';
import PostHeader from '../components/post-header';
import PostBody from '../components/post-body';
import { CMS_NAME } from '../lib/constants';

const Page = ({
  dataRest,
  page,
}: {
  dataRest: IHeaderFooterContext;
  page: IPageResponse;
}) => {
  if (!dataRest) return null;
  const router = useRouter();

  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const { data } = dataRest;

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  // console.log('page', page);
  
  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <Layout page={page}>
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <Head>
                  <title>
                    {page.title} | Next.js Blog Example with {CMS_NAME}
                  </title>
                  <meta
                    property="og:image"
                    content={page.featuredImage?.node.sourceUrl}
                  />
                </Head>
                <PostHeader
                  title={page.title}
                  coverImage={page.featuredImage}
                  date={page.date}
                />
                <PostBody content={page.content} />
              </article>
            </>
          )}
        </Container>
      </Layout>
    </HeaderFooterContext.Provider>
  );
};

export default Page;

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

  const slug = allPosts.edges.map(({ node }) => `/${node.slug}`);
  const slugWithFilter = slug.filter(
    (slug) => slug !== '/cart' && slug !== '/checkout' && slug !== '/my-account'
  );

  return {
    // paths: allPosts.edges.map(({ node }) => `/${node.slug}`) || [],
    paths: slugWithFilter || [],
    fallback: true,
  };
};
