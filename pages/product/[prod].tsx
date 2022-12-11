import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Container from '../../components/container';
import SectionSeparator from '../../components/section-separator';
import Layout from '../../components/layout';
import PostTitle from '../../components/post-title';
import {
  getFooterHeaderRestAPIData,
} from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import { HeaderFooterContext } from '../../context/headerFooterContext';
import { getProductsData } from '../../utils/products';
import { IProduct } from '../../interfaces/products.interface';
import { IHeaderFooterContext } from '../../interfaces/footerHeaderRestAPIDataResponse';
import ProductCard from '../../components/products/productCard';
import ErrorPage from 'next/error';


export default function Post({
  dataRest,
  products,
}: {
  dataRest: IHeaderFooterContext;
  products: IProduct[];
}) {
  if (!dataRest) return null;
  const router = useRouter();
  const [product] = products.filter(
    (product) => product.slug === router.query.prod
  );
  const { data } = dataRest;

  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <Layout>
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <Head>
                  <title>
                    {product.name} | Next.js Blog Example with {CMS_NAME}
                  </title>
                  <meta property="og:image" content={product.images[0]?.src} />
                </Head>
                <ProductCard product={product} products={products} />

              </article>

              <SectionSeparator />

            </>
          )}
        </Container>
      </Layout>
    </HeaderFooterContext.Provider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const data = await getPostAndMorePosts(params?.slug, preview, previewData);
  const dataRest = await getFooterHeaderRestAPIData();
  const products: IProduct[] = await getProductsData();

  return {
    props: {
      // preview,
      // post: data.post,
      // posts: data.posts,
      dataRest,
      products:products || [],
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const allPosts = await getAllPostsWithSlug();
  const products: IProduct[] = await getProductsData();
  // const prodPath = products.map((product) => product.permalink);

  return {
    paths: products.map((product) => `/product/${product.slug}`) || [],
    fallback: true,
  };
};
