import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../config/api.config';
export interface AddDetailRequestDto {
  productId: number;
  quantity: number;
  price: number;
}

export interface UpdateDetailRequestDto {
  quantity: number;
  price?: number;
}

export interface SalesOrderDetailResponseDto {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

@Injectable({ providedIn: 'root' })
export class SalesOrderDetailService {

  private http = inject(HttpClient);

  private baseUrl = API.ORDER.BASE;

  addDetail(orderId: number, body: AddDetailRequestDto) {
    return this.http.post<SalesOrderDetailResponseDto>(
      `${this.baseUrl}/${orderId}/details`,
      body
    );
  }

  updateDetail(orderId: number, detailId: number, body: UpdateDetailRequestDto) {
    return this.http.put<SalesOrderDetailResponseDto>(
      `${this.baseUrl}/${orderId}/details/${detailId}`,
      body
    );
  }

  deleteDetail(orderId: number, detailId: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/${orderId}/details/${detailId}`
    );
  }
}
