import {environment} from '../../../environments/environment';

export const API = {
  USER: {
    LOGIN: `${environment.apiUrl}/auth/login`,
    BASE: `${environment.apiUrl}/user`,
    SEARCH: `${environment.apiUrl}/user/search`
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
