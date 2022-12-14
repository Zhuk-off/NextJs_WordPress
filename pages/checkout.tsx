import { GetStaticProps } from 'next';
import CheckoutForm from '../components/checkout/checkout-form';
import Container from '../components/container';
import Layout from '../components/layout';
import { HeaderFooterContext } from '../context/headerFooterContext';
import { ICountriesData } from '../interfaces/countries.interface';
import { IHeaderFooterContext } from '../interfaces/footerHeaderRestAPIDataResponse';
import { getCountriesAPIData, getFooterHeaderRestAPIData } from '../lib/api';

const Checkout = ({
  dataRest,
  countries,
}: {
  dataRest: IHeaderFooterContext;
  countries: ICountriesData;
}) => {
  if (!dataRest) return null;
  const { data } = dataRest;

  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <Layout>
        <Container>
          <h1>Оформление заказа</h1>
          <CheckoutForm countriesData={countries} />
        </Container>
      </Layout>
    </HeaderFooterContext.Provider>
  );
};

export default Checkout;

export const getStaticProps: GetStaticProps = async () => {
  const dataRest = await getFooterHeaderRestAPIData();
  const countries = await getCountriesAPIData();

  return {
    props: {
      dataRest,
      countries: countries || {},
    },
    revalidate: 10,
  };
};
