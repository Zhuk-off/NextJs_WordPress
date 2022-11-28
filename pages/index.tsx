import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPostsForHome, getFooterHeaderRestAPIData } from '../lib/api';
import { CMS_NAME, GET_PRODUCT_ENDPOINT } from '../lib/constants';
import { HeaderFooterContext } from '../context/headerFooterContext';
import { Glia } from '../components/icons';
import Products from '../components/products';
import axios from 'axios';

export default function Index({
  allPosts: { edges },
  preview,
  dataRest,
  products,
}) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);
  const { data } = dataRest;
  const { siteTitle, favicon } = data.header;
  // console.log('products', products);

  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <>
        <Layout preview={preview}>
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
            <Products products={products} />
            <Glia />
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
  const { data: products } = await axios.get(GET_PRODUCT_ENDPOINT);

  return {
    props: { allPosts, preview, dataRest, products: products?.products ?? {} },
    revalidate: 10,
  };
};
