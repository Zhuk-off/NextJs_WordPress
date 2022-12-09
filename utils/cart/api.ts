
import { IConfig } from '../../interfaces/cart.interface';
import { getSession } from './session';

export const getApiCartConfig = (): IConfig => {
  const config = {
    headers: {
      'X-Headless-CMS': true,
    },
  };

  const storedSession = getSession();

  if (storedSession) {
    config.headers['x-wc-session'] = storedSession;
  }

  return config;
};
