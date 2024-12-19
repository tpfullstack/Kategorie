import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, CategoryDTO } from '../../Services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {

  categorieForm!: FormGroup;
  parentCategories: CategoryDTO[] = [];

  constructor(
    private service: CategoriesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadParentCategories();
    this.initForm();
  }

  loadParentCategories() {
    this.service.getAllCategories({}).subscribe(
      (categories) => {
        this.parentCategories = categories;
      },
      (error) => {
        console.error('Error loading parent categories:', error);
      }
    );
  }

  initForm() {
    this.categorieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      parent: [''],
    });
  }

  get controls() {
    return this.categorieForm.controls;
  }

  submitAdd() {
    if (this.categorieForm.valid) {
      const newCategory: Omit<CategoryDTO, 'id'> = {
        name: this.categorieForm.get('name')?.value,
        parentCategory: this.categorieForm.get('parent')?.value ? 
          { id: this.categorieForm.get('parent')?.value, name: '' } : undefined
      };
      this.service.addCategory(newCategory).subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La catégorie a été ajouté avec success ',
            confirmButtonColor: '#016017',
          });
          this.router.navigateByUrl("categories");
        },
        (error) => {
          console.error('Error adding category:', error);
          Swal.fire({
            text: "Erreur lors de l'ajout",
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