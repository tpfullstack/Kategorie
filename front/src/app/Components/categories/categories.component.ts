import { Component, OnInit } from '@angular/core';
import { CategoriesService, CategoryDTO } from '../../Services/categories.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: CategoryDTO[] = [];
  searchTerm: string = '';
  currentPage = 0;
  pageSize = 20;
  createdAfter: string = '';
  createdBefore: string = '';
  isRoot: boolean | null = null;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private categoriesService: CategoriesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    const params = {
      page: this.currentPage,
      size: this.pageSize,
      sort: this.sortColumn ? `${this.sortColumn},${this.sortDirection}` : '',
      createdAfter: this.createdAfter,
      createdBefore: this.createdBefore,
      isRoot: this.isRoot,
      name: this.searchTerm
    };

    this.categoriesService.getAllCategories(params).subscribe(
      (data: CategoryDTO[]) => {
        this.categories = data;
        this.fetchChildrenForCategories();
      },
      (error) => {
        console.error('Error fetching categories:', error);
        Swal.fire('Error', 'Erreur de chargement des catégories', 'error');
      }
    );
  }

  deleteCategory(id: number) {
    if (this.authService.isLoggedIn()) {
    Swal.fire({
      title: 'Etes vous sûr ?',
      text: "Cette action est irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#016017',
      cancelButtonColor: '#8a0613',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.deleteCategory(id).subscribe(
          () => {
            this.categories = this.categories.filter(c => c.id !== id);
            Swal.fire('Deleted!', 'Catégorie a été supprimée.', 'success');
          },
          (error) => {
            console.error('Error deleting category:', error);
            Swal.fire('Error!', 'Impossible de suprimmer cette catégorie', 'error');
          }
        );
      }
    }); }

    else (this.authService.login())
  }

  applyFilter() {
    this.currentPage = 0;
    this.loadCategories();
  }

  fetchChildrenForCategories() {
    const childrenRequests = this.categories.map(category => 
      this.categoriesService.getCategoryChildren(category.id!)
    );
    forkJoin(childrenRequests).subscribe(
      (childrenArrays: CategoryDTO[][]) => {
        this.categories.forEach((category, index) => {
          category.children = childrenArrays[index];
        });
      },
      (error) => {
        console.error('Error fetching children:', error);
        Swal.fire('Error', 'Erreur de chargement des catégories enfants', 'error');
      }
    );
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadCategories();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? '▲' : '▼';
    }
    return '';
  }

  resetFilters() {
    this.searchTerm = '';
    this.createdAfter = '';
    this.createdBefore = '';
    this.isRoot = null;
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.loadCategories();
  }
}