/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private client: HttpClient) {}
  private readonly Base_URL = environment.apiUrl;
  // Handling All request methods
  getAllCategories(){
    return this.client.get(this.Base_URL);
  }
  getCategorieById(id:any){
    return this.client.get(`${this.Base_URL}/${id}`);
  }
  addCategorie(newCategorie:any){
    return this.client.post(this.Base_URL, newCategorie);
  }
  deleteCategorie(id:any){
    return this.client.delete(`${this.Base_URL}/${id}`);
  }
  updateCategorie(id: number ,updateCategorie: any){
    return this.client.put(this.Base_URL+"/"+id, updateCategorie);
  }
}*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  // Liste de catégories simulée
  private readonly categories = [
    {
      "name": "islam ali",
      "parent": "Cairo",
      "date": "17-05-2023",
      "id": 1
    },
    {
      "name": "mona salem",
      "parent": "Elshorouk",
      "date": "20-05-2000",
      "id": 2
    },
    {
      "name": "mohammed salah",
      "parent": "Giza",
      "date": "17-05-2000",
      "id": 3
    },
    {
      "name": "Nour Ahmed",
      "parent": "Luxor",
      "date": "17-05-2000",
      "id": 4
    }
  ];

  constructor() {}

  // Simuler la méthode getAllCategories
  getAllCategories(){
    return this.categories;
  }

  // Simuler la méthode getCategorieById
  getCategorieById(id: number){
    return this.categories.find(categorie => categorie.id === id);
  }

  // Simuler la méthode addCategorie
  addCategorie(newCategorie: any){
    this.categories.push(newCategorie);
  }

  // Simuler la méthode deleteCategorie
  deleteCategorie(id: number){
    const index = this.categories.findIndex(categorie => categorie.id === id);
    if (index > -1) {
      this.categories.splice(index, 1);
    }
  }

  // Simuler la méthode updateCategorie
  updateCategorie(id: number, updatedCategorie: any){
    const index = this.categories.findIndex(categorie => categorie.id === id);
    if (index > -1) {
      this.categories[index] = { ...this.categories[index], ...updatedCategorie };
    }
  }
}
