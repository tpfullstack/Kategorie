import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from, of, switchMap } from 'rxjs';

export interface CategoryDTO {
  id: number;
  name: string;
  creationDate?: string;
  parentCategory?: CategoryDTO;
  children?: CategoryDTO[];
  numberOfChildren?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return of(headers);
      })
    );
  }

  getAllCategories(params: any): Observable<CategoryDTO[]> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] != null) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
  
    return this.http.get<CategoryDTO[]>(this.apiUrl, { params: httpParams });
  }

  getCategoryById(id: number): Observable<CategoryDTO> {
    return this.http.get<CategoryDTO>(`${this.apiUrl}/${id}`);
  }

  addCategory(category: Omit<CategoryDTO, 'id'>): Observable<CategoryDTO> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.post<CategoryDTO>(this.apiUrl, category, { headers });
      })
    );
  }

  updateCategory(id: number, category: Partial<CategoryDTO>): Observable<CategoryDTO> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.put<CategoryDTO>(`${this.apiUrl}/${id}`, category, { headers });
      })
    );
  }

  deleteCategory(id: number): Observable<void> {
    if (!this.authService.isLoggedIn()) {
      // Redirige si l'utilisateur n'est pas connecté
      this.authService.login();
      return of(); // Renvoie un Observable vide
    }
  
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
      })
    );
  }
  
}