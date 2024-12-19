import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  // Liste de catégories simulée
  private readonly categories = [
    {
      "name": "Kenza",
      "parent": "Aicha",
      "date": "17-05-2023",
      "id": 1
    },
    {
      "name": "Karim",
      "parent": "Lina",
      "date": "20-05-2000",
      "id": 2
    },
    {
      "name": "Jerry",
      "parent": "Tom",
      "date": "17-05-2000",
      "id": 3
    },
    {
      "name": "Amira",
      "parent": "Antony",
      "date": "17-05-2000",
      "id": 4
    }
  ];

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return of(headers);
      })
    );
  }

  // Example of a protected API call
  getProtectedData(): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.get('http://localhost:8080/api/categories/3', { headers });
      })
    );
  }

  // Simuler la méthode getAllCategories
  getAllCategories(){
    return this.categories;
  }
  // Simuler la méthode deleteCategorie
  deleteCategorie(id: number){
    const index = this.categories.findIndex(categorie => categorie.id === id);
    if (index > -1) {
      this.categories.splice(index, 1);
    }
  }

  // Simuler la méthode getCategorieById
  getCategorieById(id: number){
    return this.categories.find(categorie => categorie.id === id);
  }
   // Simuler la méthode addCategorie
   addCategorie(newCategorie: any){
    this.categories.push(newCategorie);
  }
    // Simuler la méthode updateCategorie
  updateCategorie(id: number, updatedCategorie: any){
    const index = this.categories.findIndex(categorie => categorie.id === id);
    if (index > -1) {
      this.categories[index] = { ...this.categories[index], ...updatedCategorie };
    }
  }

}
