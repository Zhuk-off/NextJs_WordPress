import validator from 'validator';
import { IDefaultCustomerInfo } from '../../interfaces/order.interface';
import isEmpty from './is-empty';

const validateAndSanitizeCheckoutForm = (
  data: IDefaultCustomerInfo,
  hasStates: boolean = true
) => {
  let errors = {};
  let sanitizedData = {};

  /**
   * Set the firstName value equal to an empty string if user has not entered the firstName, otherwise the Validator.isEmpty() wont work down below.
   * Note that the isEmpty() here is our custom function defined in is-empty.js and
   * Validator.isEmpty() down below comes from validator library.
   * Similarly we do it for for the rest of the fields
   */
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.address1 = !isEmpty(data.address1) ? data.address1 : '';
  data.address2 = !isEmpty(data.address2) ? data.address2 : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.postcode = !isEmpty(data.postcode) ? data.postcode : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.createAccount = !isEmpty(data.createAccount) ? data.createAccount : '';
  data.orderNotes = !isEmpty(data.orderNotes) ? data.orderNotes : '';
  // data.paymentMethod = ( ! isEmpty( data.paymentMethod ) ) ? data.paymentMethod : '';

  /**
   * Checks for error if required is true
   * and adds Error and Sanitized data to the errors and sanitizedData object
   *
   * @param {String} fieldName Field name e.g. First name, last name
   * @param {String} errorContent Error Content to be used in showing error e.g. First Name, Last Name
   * @param {Integer} min Minimum characters required
   * @param {Integer} max Maximum characters required
   * @param {String} type Type e.g. email, phone etc.
   * @param {boolean} required Required if required is passed as false, it will not validate error and just do sanitization.
   */
  const addErrorAndSanitizedData = (
    fieldName: string,
    errorContent: string,
    min: number,
    max: number,
    type: string = '',
    required: boolean
  ): void => {
    /**
     * Please note that this isEmpty() belongs to validator and not our custom function defined above.
     *
     * Check for error and if there is no error then sanitize data.
     */
    if (!validator.isLength(data[fieldName], { min, max })) {
      errors[fieldName] = `${errorContent} введите от ${min} до ${max} символов`;
    }

    if ('email' === type && !validator.isEmail(data[fieldName])) {
      errors[fieldName] = `${errorContent} не действителен`;
    }

    if ('phone' === type && !validator.isMobilePhone(data[fieldName])) {
      errors[fieldName] = `${errorContent} не действителен`;
    }

    if (required && validator.isEmpty(data[fieldName])) {
      errors[fieldName] = `${errorContent} отсутствует`;
    }

    // If no errors
    if (!errors[fieldName]) {
      sanitizedData[fieldName] = validator.trim(data[fieldName]);
      sanitizedData[fieldName] =
        'email' === type
          ? validator.normalizeEmail(sanitizedData[fieldName])
          : sanitizedData[fieldName];
      sanitizedData[fieldName] = validator.escape(sanitizedData[fieldName]);
    }
  };

  addErrorAndSanitizedData('firstName', 'Имя', 2, 35, 'string', true);
  addErrorAndSanitizedData('lastName', 'Фамилия', 2, 35, 'string', true);
  addErrorAndSanitizedData('company', 'Название компании', 0, 35, 'string', false);
  addErrorAndSanitizedData('country', 'Страну', 2, 55, 'string', true);
  addErrorAndSanitizedData(
    'address1',
    'Адрес',
    12,
    100,
    'string',
    true
  );
  addErrorAndSanitizedData('address2', '', 0, 254, 'string', false);
  addErrorAndSanitizedData('city', 'Город', 3, 25, 'string', true);
  addErrorAndSanitizedData(
    'state',
    'Штат/Округ',
    0,
    254,
    'string',
    hasStates
  );
  addErrorAndSanitizedData('postcode', 'Индекс', 2, 10, 'postcode', true);
  addErrorAndSanitizedData('phone', 'Телефон', 10, 15, 'phone', true);
  addErrorAndSanitizedData('email', 'Email', 11, 254, 'email', true);

  // The data.createAccount is a boolean value.
  sanitizedData['createAccount'] = data.createAccount;
  addErrorAndSanitizedData('orderNotes', '', 0, 254, 'string', false);

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAndSanitizeCheckoutForm;
