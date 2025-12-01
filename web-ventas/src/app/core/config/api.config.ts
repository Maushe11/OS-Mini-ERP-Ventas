import {environment} from '../../../environments/environment';

export const API = {
  CUSTOMER: {
    SEARCH: `${environment.apiUrl}/customer/search`,
    BASE: `${environment.apiUrl}/customer`
  },
  USER: {
    LOGIN: `${environment.apiUrl}/auth/login`,
    BASE: `${environment.apiUrl}/user`
  },
  PRODUCT: {
    BASE: `${environment.apiUrl}/product`
  }
};
