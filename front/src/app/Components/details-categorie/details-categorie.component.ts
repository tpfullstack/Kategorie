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
          text: 'Category not found!',
          icon: 'error',
          footer: '<a href="/categories">Back to Categories</a>'
        });
      }
    );
  }

  deleteCategory() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#016017',
      cancelButtonColor: '#8a0613',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.deleteCategory(this.categorieId).subscribe(
          () => {
            Swal.fire('Deleted!', 'The category has been deleted.', 'success');
            this.router.navigate(['/categories']);
          },
          (error) => {
            console.error('Error deleting category:', error);
            Swal.fire('Error!', 'Failed to delete the category.', 'error');
          }
        );
      }
    });
  }
}
