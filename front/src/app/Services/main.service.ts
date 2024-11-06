import { Injectable } from '@angular/core';

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

  constructor() {}

  // Simuler la méthode getAllCategories
  getAllCategories(){
    return this.categories;
  }
}
