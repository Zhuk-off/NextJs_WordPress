import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import Layout from '../components/layout';
import {
  getAllPagesSlug,
  getAllPostsForHome,
  getAllPostsWithSlug,
  getFooterHeaderRestAPIData,
  getPageByUri,
} from '../lib/api';
import { HeaderFooterContext } from '../context/headerFooterContext';
import Products from '../components/products/products';
import { IProduct } from '../interfaces/products.interface';
import { IHeaderFooterContext } from '../interfaces/footerHeaderRestAPIDataResponse';
import { getProductsData } from '../utils/products';
import SectionSeparator from '../components/section-separator';
import { IPageResponse } from '../interfaces/pages.interfaces';
import { filterSlugPages } from '../lib/helpers';

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
  // console.log('products',products);
  // console.log('mainPage',mainPage);

  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <>
        <Layout preview={preview} page={mainPage}>
          <Head>
            <title>{siteTitle}</title>
            <link
              rel="shortcut icon"
              href={favicon || '/favicon.ico'}
              type="image/x-icon"
            />
          </Head>
          <Container>
            <h2 className="mt-24 mb-12 !text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
              Товары, которые могут приехать к тебе уже сегодня
            </h2>
            <Products products={products} />
            <SectionSeparator />
            <h1 className="mt-24 mb-12 !text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
              Мой блог - переживи эти эмоции вместе со мной!
            </h1>
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
