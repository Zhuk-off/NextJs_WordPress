import cx from 'classnames';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartCounter';
import { ICountriesData } from '../../interfaces/countries.interface';
import {
  IDefaultCustomerInfo,
  IInputOrder,
} from '../../interfaces/order.interface';
import {
  handleBillingDifferentThanShipping,
  handleCreateAccount,
  setStatesForCountry,
} from '../../lib/checkoutHelpers';
import CheckboxField from './form-elements/checkbox-field';
import PaymentModes from './payment-modes';
import Address from './user-adddress';
import YourOrder from './your-order';

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

const defaultCustomerInfo: IDefaultCustomerInfo = {
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
  const { billingCountries, shippingCountries } = countriesData || {};

  const initialState: IInputOrder = {
    billing: { ...defaultCustomerInfo },
    shipping: { ...defaultCustomerInfo },
    createAccount: false,
    orderNotes: '',
    billingDifferentThanShipping: false, // If the user decides that the delivery address is different from the payment address
    paymentMethod: 'cod', // Payment method - cash on delivery and other
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
  const handleOnChange = async (
    event,
    isSipping = false,
    isBillingOrShipping = false
  ) => {
    1;
    const { target } = event || {};
    if ('createAccount' === target.name) {
      handleCreateAccount(input, setInput, target);
    } else if ('billingDifferentThanShipping' === target.name) {
      handleBillingDifferentThanShipping(input, setInput, target);
    } else if (isBillingOrShipping) {
      if (isSipping) {
        await handleShippingChange(target);
      } else {
        await handleBillingChange(target);
      }
    } else {
      const newState = { ...input, [target.name]: target.value };
      setInput(newState);
    }
    console.log('input', input);
  };

  const handleShippingChange = async (target) => {
    const newState = {
      ...input,
      shipping: { ...input?.shipping, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheShippingStates,
      setIsFetchingShippingStates
    );
  };

  const handleBillingChange = async (target) => {
    const newState = {
      ...input,
      billing: { ...input?.billing, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheBillingStates,
      setIsFetchingBillingStates
    );
  };

  return (
    <>
      {cart ? (
        <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
            <div>
              {/* Shipping Details */}
              <div className="shipping-details">
                <h2 className="mb-4 text-xl font-medium">Заполните для доставки</h2>
                <Address
                  countries={shippingCountries}
                  handleOnChange={(event) => handleOnChange(event, true, true)}
                  input={input?.shipping}
                  isFetchingStates={isFetchingBillingStates}
                  isShipping
                  states={theShippingStates}
                />
              </div>
              <div>
                <CheckboxField
                  name="billingDifferentThanShipping"
                  // type="checkbox"
                  checked={input?.billingDifferentThanShipping}
                  handleOnChange={handleOnChange}
                  label="Выставить счет на другие реквизиты?"
                  containerClassNames="mb-4 pt-4"
                />
              </div>
              {/*Billing Details*/}
              {input?.billingDifferentThanShipping ? (
                <div className="billing-details">
                  <h2 className="mb-4 text-xl font-medium">Заполните для выставления счета</h2>
                  <Address
                    states={theBillingStates}
                    countries={
                      billingCountries.length
                        ? billingCountries
                        : shippingCountries
                    }
                    input={input?.billing}
                    handleOnChange={(event) =>
                      handleOnChange(event, false, true)
                    }
                    isFetchingStates={isFetchingBillingStates}
                    isShipping={false}
                    isBillingOrShipping
                  />
                </div>
              ) : null}
            </div>
            {/* Order & Payments */}
            <div className="your-orders">
              <h2 className="mb-4 text-xl font-medium">Ваш заказ</h2>
              <YourOrder cart={cart} />

              {/* Payment */}
              <h2 className="mb-4 text-xl font-medium">
                Выберете способ оплаты
              </h2>
              <PaymentModes input={input} handleOnChange={handleOnChange} />
              <div className="woo-next-place-order-btn-wrap mt-5">
                <button
                  disabled={isOrderProcessing}
                  className={cx(
                    'w-auto rounded-sm bg-purple-600 px-5 py-3 text-white xl:w-full',
                    { 'opacity-50': isOrderProcessing }
                  )}
                  type="submit"
                >
                  Отправить заказ
                </button>
              </div>

              {/* Checkout Loading*/}
              {isOrderProcessing && <p>Processing Order...</p>}
              {requestError && (
                <p>Error : {requestError} :( Please try again</p>
              )}
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default CheckoutForm;
