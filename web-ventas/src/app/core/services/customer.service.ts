import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API} from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private http = inject(HttpClient);

  search(filter: string, page: number, size: number, sortBy: string) {
    let params = new HttpParams()
      .set('filter', filter)
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy);

    return this.http.get<any>(API.CUSTOMER.SEARCH, {params});
  }
}
