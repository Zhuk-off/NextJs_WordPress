export interface ICountriesData {
  billingCountries: IBillingCountry[];
  shippingCountries: IShippingCountry[];
}

export interface IBillingCountry {}

export interface IShippingCountry {
  countryCode: string;
  countryName: string;
}

export interface IState {
  stateCode: string;
  stateName: string;
}
