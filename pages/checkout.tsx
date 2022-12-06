import axios from 'axios';
import { count } from 'console';
import { GetStaticProps } from 'next';
import CheckoutForm from '../components/checkout/checkout-form';
import Container from '../components/container';
import Layout from '../components/layout';
import { HeaderFooterContext } from '../context/headerFooterContext';
import { ICountriesData } from '../interfaces/countries.interface';
import { IHeaderFooterContext } from '../interfaces/footerHeaderRestAPIDataResponse';
import { getFooterHeaderRestAPIData } from '../lib/api';
import { WOOCOMMERCE_COUNTRIES_ENDPOINT } from '../lib/constants';

const Checkout = ({ dataRest, countries }:{dataRest: IHeaderFooterContext, countries:ICountriesData}) => {
  if (!dataRest) return null;
  const { data } = dataRest;

  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <Layout>
        <Container>
          <h1>Checkout</h1>
          <CheckoutForm countriesData={countries} />
        </Container>
      </Layout>
    </HeaderFooterContext.Provider>
  );
};

export default Checkout;

export const getStaticProps: GetStaticProps = async () => {
  const dataRest = await getFooterHeaderRestAPIData();
  const { data: countries } = await axios.get(WOOCOMMERCE_COUNTRIES_ENDPOINT);

  return {
    props: {
      dataRest,
      countries: countries || {},
    },
    revalidate: 10,
  };
};
