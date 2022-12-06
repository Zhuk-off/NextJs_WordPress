import { IBillingCountry, IShippingCountry } from "./countries.interface";

export interface IAddress {
  input:IDefaultCustomerInfo,
  countries:IShippingCountry[] | IBillingCountry[],
  states: unknown[],
  handleOnChange:(event:unknown, isSipping:boolean, isBilling:boolean) => void,
  isFetchingStates:boolean,
  isShipping?:boolean
  isBillingOrShipping?:boolean
}

export interface IDefaultCustomerInfo {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  state?: string;
  postcode?: string;
  email?: string;
  phone?: string;
  company?: string;
  errors?: null | string;
}

export interface IInputOrder  {
  billing: IDefaultCustomerInfo,
  shipping: IDefaultCustomerInfo ,
  createAccount: boolean,
  orderNotes: string,
  billingDifferentThanShipping: boolean,
  paymentMethod: 'cod'
}

export interface IInputField {
  handleOnChange: any
  inputValue?: string;
  name: string;
  type?: string;
  label: string;
  errors: Object;
  placeholder?: string;
  required?: boolean;
  containerClassNames?: string;
  isShipping: boolean;
}