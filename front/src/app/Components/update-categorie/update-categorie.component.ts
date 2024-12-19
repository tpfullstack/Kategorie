import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, CategoryDTO } from '../../Services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {

  categorieForm!: FormGroup;
  categorieId!: number;
  categorie?: CategoryDTO;
  parentCategories: CategoryDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categorieId = +this.activatedRoute.snapshot.params['id'];
    this.loadParentCategories();
    this.initForm();
    this.getCategoryById(this.categorieId);
  }
  
  loadParentCategories() {
    this.service.getAllCategories({}).subscribe(
      (categories) => {
        this.parentCategories = categories.filter(c => c.id !== this.categorieId);
      },
      (error) => {
        console.error('Error loading parent categories:', error);
      }
    );
  }

  initForm() {
    this.categorieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      parentCategory: [''],
      creationDate: [{value: '', disabled: true}],
    });
  }

  getCategoryById(id: number) {
    this.service.getCategoryById(id).subscribe(
      (category) => {
        this.categorie = category;
        this.categorieForm.patchValue({
          name: category.name,
          parentCategory: category.parentCategory?.id,
          creationDate: category.creationDate
        });
      },
      (error) => {
        console.error('Error fetching category:', error);
        Swal.fire('Error', 'Failed to load category', 'error');
      }
    );
  }

  deleteCategory() {
    Swal.fire({
      title: 'Etes vous sûr ?',
      showCancelButton: true,
      confirmButtonColor: '#016017',
      cancelButtonColor: '#8a0613',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCategory(this.categorieId).subscribe(
          () => {
            this.router.navigate(['categories']);
          },
          (error) => {
            console.error('Error deleting category:', error);
            Swal.fire('Error', 'Failed to delete category', 'error');
          }
        );
      }
    });
  }
  
  submitUpdate() {
    if (this.categorieForm.valid) {
      const updatedCategory: Partial<CategoryDTO> = {
        id: this.categorie?.id,
        name: this.categorieForm.get('name')?.value,
        parentCategory: this.categorieForm.get('parentCategory')?.value ? 
          { id: this.categorieForm.get('parentCategory')?.value, name: '' } as CategoryDTO : undefined
      };
  
      this.service.updateCategory(this.categorieId, updatedCategory).subscribe(
        (updatedCat) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La catégorie a été mise à jour',
            confirmButtonColor: '#016017',
          });
          this.router.navigateByUrl("categories");
        },
        (error) => {
          console.error('Error updating category:', error);
          Swal.fire({
            text: "Erreur de mise à jour",
            confirmButtonColor: '#8a0613',
          });
        }
      );
    } else {
      Swal.fire({
        text: "Veuillez remplir les champs correctement",
        confirmButtonColor: '#8a0613',
      });
    }
  }
}