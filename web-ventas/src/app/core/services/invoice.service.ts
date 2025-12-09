import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface InvoiceRequestDto {
  type: 'BOLETA' | 'FACTURA';
}

export interface InvoiceResponseDto {
  idInvoice: number;
  type: string;
  number: string;
  date: string;
  total: number;
  orderId: number;
}

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  generate(orderId: number, dto: InvoiceRequestDto): Observable<InvoiceResponseDto> {
    return this.http.post<InvoiceResponseDto>(
      `${this.apiUrl}/order/${orderId}/invoice`,
      dto
    );
  }
}
