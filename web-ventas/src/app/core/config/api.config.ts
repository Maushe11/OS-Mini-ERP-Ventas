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
  },
  ORDER: {
    BASE: `${environment.apiUrl}/order`,
    SEARCH: `${environment.apiUrl}/order/search`,
  },
  DASHBOARD: {
    SUMMARY: `${environment.apiUrl}/dashboard/summary`,
    MONTHLY_SALES: `${environment.apiUrl}/dashboard/monthly-sales`,
    PRODUCT_RANKING: `${environment.apiUrl}/dashboard/product-ranking`,
    TOP_CUSTOMERS: `${environment.apiUrl}/dashboard/top-customers`,
  }
};
