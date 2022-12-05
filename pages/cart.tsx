import { GetStaticProps } from 'next';
import CartItemsContainer from '../components/cart/cart-items-container';
import Container from '../components/container';
import Layout from '../components/layout';
import { HeaderFooterContext } from '../context/headerFooterContext';
import { getFooterHeaderRestAPIData, getPostAndMorePosts } from '../lib/api';

const Cart = ({ post, posts, preview, dataRest }) => {
  if (!dataRest) return null;
  const { data } = dataRest;

  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <Layout preview={preview}>
        <Container>
          <h1 className="uppercase tracking-0.5px">Товары, что вы добавили в корзину</h1>
          <CartItemsContainer/>
        </Container>
      </Layout>
    </HeaderFooterContext.Provider>
  );
};

export default Cart;

export const getStaticProps: GetStaticProps = async () => {
  const dataRest = await getFooterHeaderRestAPIData();

  return {
    props: {
      dataRest,
    },
    revalidate: 10,
  };
};
