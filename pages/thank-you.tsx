import { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { CartContext } from '../context/CartCounter';
import { Bag, Loading } from '../components/icons';
import Layout from '../components/layout';
import { getFooterHeaderRestAPIData, getPageByUri } from '../lib/api';
import { HeaderFooterContext } from '../context/headerFooterContext';


const ThankYouContent = () => {
  const [cart, setCart] = useContext(CartContext);
  const [isSessionFetching, setSessionFetching] = useState(false);
  const [sessionData, setSessionData] = useState({
    metadata: { orderId: '' },
    customer_email: '',
  });
  const session_id =
    typeof window !== 'undefined' ? Router.query.session_id : null;

  useEffect(() => {
    setSessionFetching(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('woo-next-cart');
      setCart(null);

      if (session_id) {
        axios
          .get(`/api/get-stripe-session/?session_id=${session_id}`)
          .then((response) => {
            setSessionData(response?.data ?? {});
            setSessionFetching(false);
          })
          .catch((error) => {
            console.log(error);
            setSessionFetching(false);
          });
      }
    }
  }, [session_id]);

  return (
    <div className="h-almost-screen">
      <div className="w-600px m-auto mt-10">
        {isSessionFetching ? (
          <Loading />
        ) : (
          <>
            <h2 className="mb-6 text-xl">
              <Bag className="mr-1 inline-block" />{' '}
              <span>Thank you for placing the order.</span>
            </h2>
            <p>Your payment is successful and your order details are: </p>
            <table className="whitespace-no-wrap mb-8 w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="title-font rounded-tl rounded-bl bg-gray-100 px-4 py-3 text-sm font-medium tracking-wider text-gray-900">
                    Name
                  </th>
                  <th className="title-font bg-gray-100 px-4 py-3 text-sm font-medium tracking-wider text-gray-900">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3">Order#</td>
                  <td className="px-4 py-3">
                    {sessionData?.metadata?.orderId}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Email</td>
                  <td className="px-4 py-3">{sessionData?.customer_email}</td>
                </tr>
              </tbody>
            </table>
            <Link
              href="/"
              className="w-auto rounded-sm bg-purple-600 px-5 py-3 text-white"
            >
              Shop more
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default function ThankYou({ dataRest }) {
  const { data } = dataRest;
  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <Layout>
        <ThankYouContent />
      </Layout>
    </HeaderFooterContext.Provider>
  );
}

export async function getStaticProps() {
  const dataRest = await getFooterHeaderRestAPIData();
  return {
    props: {
      dataRest,
    },

    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };
}
