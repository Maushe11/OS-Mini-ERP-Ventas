import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../config/api.config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private http = inject(HttpClient);

  getSummary(): Observable<any> {
    return this.http.get(API.DASHBOARD.SUMMARY);
  }

  getMonthlySales(): Observable<any[]> {
    return this.http.get<any[]>(API.DASHBOARD.MONTHLY_SALES);
  }

  getProductRanking(): Observable<any[]> {
    return this.http.get<any[]>(API.DASHBOARD.PRODUCT_RANKING);
  }

  getTopCustomers(): Observable<any[]> {
    return this.http.get<any[]>(API.DASHBOARD.TOP_CUSTOMERS);
  }

}
