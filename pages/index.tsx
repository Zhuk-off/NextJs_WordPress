import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import Layout from '../components/layout';
import {
  getAllPostsForHome,
  getFooterHeaderRestAPIData,
  getPageByUri,
} from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import { HeaderFooterContext } from '../context/headerFooterContext';
import Products from '../components/products/products';
import { IProduct } from '../interfaces/products.interface';
import { IHeaderFooterContext } from '../interfaces/footerHeaderRestAPIDataResponse';
import { getProductsData } from '../utils/products';
import SectionSeparator from '../components/section-separator';
import { IPageResponse } from '../interfaces/pages.interfaces';

export default function Index({
  allPosts: { edges },
  preview,
  dataRest,
  products,
  mainPage,
}: {
  allPosts: any;
  preview: any;
  dataRest: IHeaderFooterContext;
  products: IProduct[];
  mainPage: IPageResponse;
}) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);
  const { data } = dataRest;
  const { siteTitle, favicon } = data.header;

  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <>
        <Layout preview={preview} page={mainPage}>
          <Head>
            <title>
              {siteTitle || `Next.js Blog Example with ${CMS_NAME}`}
            </title>
            <link
              rel="shortcut icon"
              href={favicon || '/favicon.ico'}
              type="image/x-icon"
            />
          </Head>
          <Container>
            <h3 className="mt-24 mb-12 !text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
              Товары, которые могут приехать к тебе уже сегодня
            </h3>
            <Products products={products} />
            <SectionSeparator />
            <h3 className="mt-24 mb-12 !text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
              Мой блог - переживи эти эмоции вместе со мной!
            </h3>
            <Intro />
            {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.featuredImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </Container>
        </Layout>
      </>
    </HeaderFooterContext.Provider>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  const dataRest = await getFooterHeaderRestAPIData();
  const products = await getProductsData();
  const mainPage = await getPageByUri(`/`);

  return {
    props: {
      allPosts,
      preview,
      dataRest,
      products: products ?? {},
      mainPage: mainPage ?? {},
    },
    revalidate: 10,
  };
};
