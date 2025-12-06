import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API} from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private http = inject(HttpClient);

  /** Buscar usuarios (paginado + filtros) */
  search(filter: string, page: number, size: number, sortBy: string) {
    let params = new HttpParams()
      .set('filter', filter)
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy);

    return this.http.get<any>(`${API.USER.SEARCH}`, {params});
  }

  /** Obtener usuario por ID */
  getById(id: number) {
    return this.http.get<any>(`${API.USER.BASE}/${id}`);
  }

  /** Crear usuario */
  create(body: any) {
    return this.http.post<any>(API.USER.BASE, body);
  }

  /** Actualizar usuario */
  update(id: number, body: any) {
    return this.http.put<any>(`${API.USER.BASE}/${id}`, body);
  }

}
