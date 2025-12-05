import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API} from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient);

  /** Buscar productos (paginado + filtros), igual que CustomerService */
  search(filter: string, page: number, size: number, sortBy: string) {
    let params = new HttpParams()
      .set('filter', filter)
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy);

    // Igual estructura que customerService.search
    return this.http.get<any>(`${API.PRODUCT.SEARCH}`, {params});
  }

  /** Obtener producto por ID */
  getById(id: number) {
    return this.http.get<any>(`${API.PRODUCT.BASE}/${id}`);
  }

  /** Crear producto */
  create(body: any) {
    return this.http.post<any>(API.PRODUCT.BASE, body);
  }

  /** Actualizar producto */
  update(id: number, body: any) {
    return this.http.put<any>(`${API.PRODUCT.BASE}/${id}`, body);
  }

}
