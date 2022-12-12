import cx from 'classnames';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { CartContext } from '../../context/CartCounter';
import { ICountriesData, IState } from '../../interfaces/countries.interface';
import {
  IDefaultCustomerInfo,
  IInputOrder,
} from '../../interfaces/order.interface';
import {
  handleBillingDifferentThanShipping,
  handleCreateAccount,
  handleOtherPaymentMethodCheckout,
  setStatesForCountry,
} from '../../lib/checkoutHelpers';
import validateAndSanitizeCheckoutForm from '../../utils/validator/checkout';
import CheckboxField from './form-elements/checkbox-field';
import PaymentModes from './payment-modes';
import Address from './user-adddress';
import YourOrder from './your-order';

// Using this for testing pruposes, so you dont, have to fill the checkout form over an over again.

const defaultCustomerInfo: IDefaultCustomerInfo = {
  firstName: 'Александр',
  lastName: 'Иванов',
  address1: 'ул. Богатырева 16, кв. 56',
  address2: 'ул. Богдана Хмельничкого 36, корп. 2, кв. 8',
  city: 'Витебск',
  country: 'Беларусь',
  state: '',
  postcode: '210026',
  email: 'alex.ivanov@gmail.com',
  phone: '+375297116455',
  company: 'ООО "Иванов и партнеры"',
  errors: null,
};

// const defaultCustomerInfo: IDefaultCustomerInfo = {
//   firstName: '',
//   lastName: '',
//   address1: '',
//   address2: '',
//   city: '',
//   country: '',
//   state: '',
//   postcode: '',
//   email: '',
//   phone: '',
//   company: '',
//   errors: null,
// };

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
  const [input, setInput] = useState<IInputOrder>(initialState); // Here we will store all usations of entry of information
  const [requestError, setRequestError] = useState<string | null>(null); // Error information is stored here
  const [theShippingStates, setTheShippingStates] = useState<IState[]>([]); // Here we keep a delivery state, if the user has chosen a specific country, we must be able to get this data
  const [theBillingStates, setTheBillingStates] = useState<IState[]>([]); // Here we keep a billing state
  const [isFetchingShippingStates, setIsFetchingShippingStates] =
    useState<boolean>(false); // Loading state
  const [isFetchingBillingStates, setIsFetchingBillingStates] =
    useState<boolean>(false); // Loading state
  const [isOrderProcessing, setIsOrderProcessing] = useState<boolean>(false); // Loading when sending an order
  const [createdOrderData, setCreatedOrderData] = useState({}); // information about order
  const [orderSend, setOrderSend] = useState<boolean>(false);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /**
     * Validate Billing and Shipping Details
     *
     * Note:
     * 1. If billing is different than shipping address, only then validate billing.
     * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
     * the respective states should only be mandatory, if a country has states.
     */
    const billingValidationResult = input?.billingDifferentThanShipping
      ? validateAndSanitizeCheckoutForm(
          input?.billing,
          Boolean(theBillingStates?.length)
        )
      : {
          errors: null,
          isValid: true,
        };
    const shippingValidationResult = validateAndSanitizeCheckoutForm(
      input?.shipping,
      Boolean(theShippingStates?.length)
    );

    setInput({
      ...input,
      billing: { ...input.billing, errors: billingValidationResult.errors },
      shipping: { ...input.shipping, errors: shippingValidationResult.errors },
    });

    // If there are any errors, return.
    if (!shippingValidationResult.isValid || !billingValidationResult.isValid) {
      return null;
    }

    // For stripe payment mode, handle the strip payment
    if ('stripe' === input.paymentMethod) {
      return null;
    }

    // For Any other payment mode, create the order and redirect the user to payment url.
    const createdOrderData = await handleOtherPaymentMethodCheckout(
      input,
      cart?.cartItems,
      setRequestError,
      setCart,
      setIsOrderProcessing,
      setCreatedOrderData
    );

    if (createdOrderData.paymentUrl) {
      console.log('hey', createdOrderData);
      // window.location.href = createdOrderData.paymentUrl;
    }

    setRequestError(null); //If he has reached this moment, then this means that there is no error
    setOrderSend(true) // To display the message "Your order is accepted"
  };

  const handleOnChange = async (
    event: ChangeEvent<HTMLInputElement & HTMLSelectElement>,
    isSipping: boolean = false,
    isBillingOrShipping: boolean = false
  ): Promise<void> => {
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
  };

  const handleShippingChange = async (
    target: EventTarget & HTMLSelectElement
  ) => {
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

  const handleBillingChange = async (
    target: EventTarget & HTMLSelectElement
  ) => {
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
                <h2 className="mb-4 text-xl font-medium">
                  Заполните для доставки
                </h2>
                <Address
                  countries={shippingCountries}
                  handleOnChange={(
                    event: ChangeEvent<HTMLInputElement & HTMLSelectElement>
                  ) => handleOnChange(event, true, true)}
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
                  <h2 className="mb-4 text-xl font-medium">
                    Заполните для выставления счета
                  </h2>
                  <Address
                    states={theBillingStates}
                    countries={
                      billingCountries.length
                        ? billingCountries
                        : shippingCountries
                    }
                    input={input?.billing}
                    handleOnChange={(
                      event: ChangeEvent<HTMLInputElement & HTMLSelectElement>
                    ) => handleOnChange(event, false, true)}
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
              {isOrderProcessing && (
                <p>Заказ обрабатывается...̿' ̿'\̵͇̿̿\з=(◕_◕)=ε/̵͇̿̿/'̿'̿ ̿</p>
              )}
              {requestError && (
                <p>Error : {requestError} :( Please try again</p>
              )}
            </div>
          </div>
        </form>
      ) : null}
      {orderSend && !cart ? (
        <>
          <h2 className="mt-20 text-4xl font-semibold">Ваш заказ принят! </h2>
          <p className="mb-50 mt-5 text-lg">
            Наш менеджер в ближайшее время свяжется с вами для уточнения
            деталей.{' '}
          </p>

          <div className="woo-next-place-order-btn-wrap mt-5">
            <Link href="/">
              <button className="mr-2 mb-28 rounded-lg bg-brand-orange px-5 py-2.5 text-center text-sm font-medium text-white duration-500 hover:bg-brand-royal-blue dark:focus:ring-yellow-900">
                <span className="woo-next-cart-checkout-txt">
                  Продолжить покупки
                </span>
                <i className="fas fa-long-arrow-alt-right" />
              </button>
            </Link>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CheckoutForm;
