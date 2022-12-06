import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartCounter';
import { ICountriesData } from '../../interfaces/countries.interface';
import { IDefaultCustomerInfo, IInputOrder } from '../../interfaces/order.interface';
import Address from './user-adddress';

// Using this for testing pruposes, so you dont, have to fill the checkout form over an over again.

// const defaultCustomerInfo:IDefaultCustomerInfo = {
  //   firstName: 'Александр',
  //   lastName: 'Иванов',
  //   address1: 'ул. Богатырева 16, кв. 56',
  //   address2: 'ул. Богдана Хмельничкого 36, корп. 2, кв. 8',
  //   city: 'Беларусь',
  //   country: 'Витебск',
  //   state: '',
  //   postcode: '210026',
//   email: 'alex.ivanov@gmail.com',
//   phone: '+375297116455',
//   company: 'ООО "Иванов и пратнеры"',
//   errors: null,
// }

const defaultCustomerInfo:IDefaultCustomerInfo = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  country: '',
  state: '',
  postcode: '',
  email: '',
  phone: '',
  company: '',
  errors: null,
};

const CheckoutForm = ({ countriesData }: { countriesData: ICountriesData }) => {
  // console.log(countriesData.shippingCountries);
  
  const { billingCountries, shippingCountries } = countriesData || {};
  
  const initialState:IInputOrder = {
    billing: { ...defaultCustomerInfo },
    shipping: { ...defaultCustomerInfo },
    createAccount: false,
    orderNotes: '',
    billingDifferentThanShipping: false, // If the user decides that the delivery address is different from the payment address
    paymentMethod: 'cod', // Payment method - cash on delivery
  };
  
  const [cart, setCart] = useContext(CartContext);
  const [input, setInput] = useState(initialState); // Here we will store all usations of entry of information
  const [requestError, setRequestError] = useState(null); // Error information is stored here
  const [theShippingStates, setTheShippingStates] = useState([]); // Here we keep a delivery state, if the user has chosen a specific country, we must be able to get this data
  const [theBillingStates, setTheBillingStates] = useState([]); // Here we keep a billing state
  const [isFetchingShippingStates, setIsFetchingShippingStates] =
  useState(false); // Loading state
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false); // Loading state
  const [isOrderProcessing, setIsOrderProcessing] = useState(false); // Loading when sending an order
  const [createOrderDate, setCreateOrderDate] = useState({}); // information about order
  
  const handleFormSubmit = () => {};
  const handleOnChange = (event, isSipping = false, isBilling = false) => {};
  
  return (
    <>
      {cart ? (
        <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
            <div>
              {/* Shipping Details */}
              <div className="shipping-details">
                <h2 className="mb-4 text-xl font-medium">Shipping Details</h2>
                <Address
                  countries={shippingCountries}
                  handleOnChange={(event) => handleOnChange(event, true, true)}
                  input={input?.shipping}
                  isFetchingStates={isFetchingBillingStates}
                  isShipping
                  states={theShippingStates}
                  />
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default CheckoutForm;

