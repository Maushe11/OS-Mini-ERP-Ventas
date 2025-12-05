import {environment} from '../../../environments/environment';

export const API = {
  USER: {
    BASE: `${environment.apiUrl}/user`,
    LOGIN: `${environment.apiUrl}/auth/login`,
  },
  CUSTOMER: {
    BASE: `${environment.apiUrl}/customer`,
    SEARCH: `${environment.apiUrl}/customer/search`
  },
  PRODUCT: {
    BASE: `${environment.apiUrl}/product`,
    SEARCH: `${environment.apiUrl}/product/search`,
  }
};
