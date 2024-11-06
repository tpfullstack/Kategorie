import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/Services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  deleteShow: boolean = false;
  deleteAnswer: boolean = false;
  searchTerm: string = '';
  selectedFilter: string = ''; 

  constructor(public service: MainService) {}

  ngOnInit(): void {
    this.get_All_Categories();
  }


  get_All_Categories() {
    this.categories = this.service.getAllCategories();
  }

  // Filtrer les catégories en fonction de la recherche et du filtre sélectionné
  filteredCategories() {
    let filtered = this.categories.filter(categorie =>
      categorie.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      categorie.parent.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      categorie.date.includes(this.searchTerm)
    );

    // Trier selon le filtre sélectionné
    if (this.selectedFilter === 'date') {
      return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    if (this.selectedFilter === 'alphabet') {
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }
  deleteCategorie(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#016017',
      cancelButtonColor: '#8a0613',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCategorie(id);
        this.categories = this.categories.filter((s: any) => s.id !== id); // Mise à jour après suppression
      }
    });
  }
  // Appliquer le filtre
  applyFilter() {
    this.filteredCategories();
  }

  clickYes() {
    this.deleteAnswer = true;
    this.deleteShow = false;
  }

  clickNo() {
    this.deleteAnswer = false;
    this.deleteShow = false;
  }
}
