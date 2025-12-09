import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API} from '../config/api.config';

export interface SalesOrderListItem {
  idOrder: number;
  customerName: string;
  userName: string;
  date: string;
  total: number;
  status: string;
}

export interface SalesOrderDetailItem {
  idDetail: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface SalesOrderResponseDto {
  idOrder: number;
  customerName: string;
  userName: string;
  date: string;
  total: number;
  status: string;
  details: SalesOrderDetailItem[];
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}


export interface OrderDetailRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequestDto {
  customerId: number;
  details: OrderDetailRequest[];
}

@Injectable({
  providedIn: 'root',
})
export class SalesOrderService {

  private http = inject(HttpClient);

  private readonly baseUrl = API.ORDER.BASE;

  search(filter: string, page: number, size: number, sortBy: string) {
    let params = new HttpParams()
      .set('filter', filter)
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy);

    return this.http.get<PageResponse<SalesOrderListItem>>(
      `${this.baseUrl}/search`,
      {params}
    );
  }

  getById(id: number) {
    return this.http.get<SalesOrderResponseDto>(`${this.baseUrl}/${id}`);
  }

  create(dto: OrderRequestDto) {
    return this.http.post<SalesOrderResponseDto>(this.baseUrl, dto);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
