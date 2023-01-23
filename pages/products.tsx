import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '../components/container';
import Layout from '../components/layout';
import { getFooterHeaderRestAPIData } from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import { HeaderFooterContext } from '../context/headerFooterContext';
import Products from '../components/products/products';
import { IProduct } from '../interfaces/products.interface';
import { IHeaderFooterContext } from '../interfaces/footerHeaderRestAPIDataResponse';
import { getProductsData } from '../utils/products';

export default function ProductsPage({
  dataRest,
  products,
}: {
  dataRest: IHeaderFooterContext;
  products: IProduct[];
}) {
  const { data } = dataRest;
  const { siteTitle, favicon } = data.header;

  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <>
        <Layout>
          <Head>
            <title>
              {siteTitle}
            </title>
            <link
              rel="shortcut icon"
              href={favicon || '/favicon.ico'}
              type="image/x-icon"
            />
          </Head>
          <Container>
            <h1 className="mt-24 mb-12 text-center text-4xl font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none lg:text-6xl">
              Лучшие товары с бесплатной доставкой в ваш регион
            </h1>
            <Products products={products} />
          </Container>
        </Layout>
      </>
    </HeaderFooterContext.Provider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dataRest = await getFooterHeaderRestAPIData();
  const products = await getProductsData();

  return {
    props: { dataRest, products: products ?? {} },
    revalidate: 10,
  };
};
