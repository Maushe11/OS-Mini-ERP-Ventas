import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API} from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private http = inject(HttpClient);

  /** Buscar clientes (paginado + filtros) */
  search(filter: string, page: number, size: number, sortBy: string) {
    let params = new HttpParams()
      .set('filter', filter)
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy);

    return this.http.get<any>(API.CUSTOMER.SEARCH, {params});
  }

  /** Obtener cliente por ID */
  getById(id: number) {
    return this.http.get<any>(`${API.CUSTOMER.BASE}/${id}`);
  }

  /** Crear cliente */
  create(body: any) {
    return this.http.post<any>(API.CUSTOMER.BASE, body);
  }

  /** Actualizar cliente */
  update(id: number, body: any) {
    return this.http.put<any>(`${API.CUSTOMER.BASE}/${id}`, body);
  }
}
