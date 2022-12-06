import { IShippingCountry } from '../../interfaces/countries.interface';
import { IAddress } from '../../interfaces/order.interface';
import CountrySelection from './country-selection';
import InputField from './form-elements/input-field';
import StatesSelection from './states-selection';

const Address = ({
  input = {},
  countries = [],
  states,
  handleOnChange = () => null,
  isFetchingStates = false,
  isShipping = false,
}: IAddress) => {
  const { errors } = input || {};

  return (
    <>
      <div className="flex flex-wrap overflow-hidden sm:-mx-3">
        <InputField
          name="firstName"
          inputValue={input?.firstName}
          required
          handleOnChange={handleOnChange}
          label="Имя"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
        />
        <InputField
          name="lastName"
          inputValue={input?.lastName}
          required
          handleOnChange={handleOnChange}
          label="Фамилия"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
        />
      </div>
      <InputField
        name="company"
        inputValue={input?.company}
        handleOnChange={handleOnChange}
        label="Название компании (опционально)"
        errors={errors}
        isShipping={isShipping}
        containerClassNames="mb-4"
      />
      {/* Country Selection*/}
      <CountrySelection
        input={input}
        handleOnChange={handleOnChange}
        countries={countries}
        isShipping={isShipping}
      />
      <InputField
        name="address1"
        inputValue={input?.address1}
        required
        handleOnChange={handleOnChange}
        label="Адрес"
        placeholder="ул. Богатырева, д.10"
        errors={errors}
        isShipping={isShipping}
        containerClassNames="mb-4"
      />
      <InputField
        name="address2"
        // inputValue={input?.address2}
        handleOnChange={handleOnChange}
        label="Другой адрес"
        placeholder="ул. Богатырева, д.56 (опционально)"
        errors={errors}
        isShipping={isShipping}
        containerClassNames="mb-4"
      />
      <InputField
        name="city"
        required
        inputValue={input?.city}
        handleOnChange={handleOnChange}
        label="Город"
        errors={errors}
        isShipping={isShipping}
        containerClassNames="mb-4"
      />
      {/* State */}
      <StatesSelection
				input={input}
				handleOnChange={handleOnChange}
				states={states}
				isShipping={isShipping}
				isFetchingStates={isFetchingStates}
			/>
      <div className="flex flex-wrap overflow-hidden sm:-mx-3">
        <InputField
          name="postcode"
          inputValue={input?.postcode}
          required
          handleOnChange={handleOnChange}
          label="Почтовый индекс"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
        />
        <InputField
          name="phone"
          inputValue={input?.phone}
          required
          handleOnChange={handleOnChange}
          label="Номер телефона"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
        />
      </div>
      <InputField
        name="email"
        type="email"
        inputValue={input?.email}
        required
        handleOnChange={handleOnChange}
        label="Email"
        errors={errors}
        isShipping={isShipping}
        containerClassNames="mb-4"
      />
    </>
  );
};

export default Address;
