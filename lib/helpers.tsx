import { ReactComponentElement } from 'react';
import * as SvgIconsComponent from '../components/icons';
import {
  ICountriesData,
  IShippingCountry,
} from '../interfaces/countries.interface';
import { FRONTEND_SITE_URL } from './constants';

/** Use to modify page URLs from backend to frontend.
 * The default WordPress tools don't work.
 * When creating a post, an error occurs in WordPress. */

export const modifyUrlBackendToFrontend = (data: object): object => {
  modifyUrl(data);

  function modifyUrl(data: object) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (typeof element === 'object') {
          modifyUrl(element);
        } else {
          let result = key.match(/^url$/);
          if (result) {
            if (typeof element === 'string') {
              const elementReplaced = element.replace(
                process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
                FRONTEND_SITE_URL
              );
              data[key] = elementReplaced;
            }
          }
        }
      }
    }
  }

  return data;
};

export const modifyUrlBackendToFrontendWC = (data: object[]): object[] => {
  data.forEach((elem) => {
    modifyUrlWCResponse(elem);
  });

  function modifyUrlWCResponse(data: object) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (typeof element === 'object') {
          modifyUrlWCResponse(element);
        } else {
          let result = key.match(/^permalink$/) || key.match(/^href$/);
          if (result) {
            if (typeof element === 'string') {
              const elementReplaced = element.replace(
                process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
                FRONTEND_SITE_URL
              );
              data[key] = elementReplaced;
            }
          }
        }
      }
    }
  }

  return data;
};

/**
 * Icons Component map.
 *
 * @param {string} name Icon Name.
 * @returns {*}
 */
export const getIconComponentByName = (
  name,
  width?: number,
  heigth?: number
) => {
  const ComponentsMap = {
    facebook: SvgIconsComponent.Facebook,
    twitter: SvgIconsComponent.Twitter,
    instagram: SvgIconsComponent.Instagram,
    youtube: SvgIconsComponent.Youtube,
  };

  if (name in ComponentsMap) {
    const IconComponent = ComponentsMap[name];
    return <IconComponent width={width} heigth={heigth} />;
  } else {
    return null;
  }
};

export function modifyCountries(countries: ICountriesData) {
  const eswatiniCountry = countries.shippingCountries.find(
    (country) => country.countryName === 'Eswatini'
  );
  eswatiniCountry.countryName = 'Эсватини';
  const sortCountries = countries.shippingCountries.sort(SortCountries);
  return sortCountries;
}

function SortCountries(country1: IShippingCountry, country2: IShippingCountry) {
  if (country1.countryName < country2.countryName) {
    return -1;
  }
  if (country1.countryName > country2.countryName) {
    return 1;
  }
  return 0;
}
