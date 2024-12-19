import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, CategoryDTO } from '../../Services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-categorie',
  templateUrl: './details-categorie.component.html',
  styleUrls: ['./details-categorie.component.css']
})
export class DetailsCategorieComponent implements OnInit {
  categorieForm!: FormGroup;
  categorieId!: number;
  categorie: CategoryDTO | null = null;

  constructor(
    private categoriesService: CategoriesService,
    public router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categorieId = +this.activatedRoute.snapshot.params['id'];
    this.initForm();
    this.getCategoryById(this.categorieId);
  }

  initForm() {
    this.categorieForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      parentCategory: [{ value: '', disabled: true }],
      creationDate: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  getCategoryById(id: number) {
    this.categoriesService.getCategoryById(id).subscribe(
      (category: CategoryDTO) => {
        this.categorie = category;
        this.categorieForm.patchValue({
          name: category.name,
          parentCategory: category.parentCategory ? category.parentCategory.name : 'N/A',
          creationDate: category.creationDate
        });
      },
      (error) => {
        console.error('Error fetching category:', error);
        Swal.fire({
          title: 'Oops...',
          text: 'Catégorie non trouvée',
          icon: 'error',
          footer: '<a href="/categories">Retour aux catégories</a>'
        });
      }
    );
  }

  deleteCategory() {
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
        this.categoriesService.deleteCategory(this.categorieId).subscribe(
          () => {
            Swal.fire('Deleted!', 'La catégirie a été supprimée', 'success');
            this.router.navigate(['/categories']);
          },
          (error) => {
            console.error('Error deleting category:', error);
            Swal.fire('Error!', 'Impossible de supprimer la catégorie', 'error');
          }
        );
      }
    });
  }
}
