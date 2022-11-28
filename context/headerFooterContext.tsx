import { createContext } from 'react';
import { IHeaderFooterContext } from '../interfaces/footerHeaderRestAPIDataResponse';

export const HeaderFooterContext = createContext<IHeaderFooterContext>({
  data: {},
});
