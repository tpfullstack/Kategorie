import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/Services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {

  categorieForm!: FormGroup;
  categorieId!: number;
  categorie: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: MainService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categorieId = +this.activatedRoute.snapshot.params['id'];
    this.initForm();
    this.getCategorieById(this.categorieId);
  }

  initForm() {
    this.categorieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      parent: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      date: ['', [Validators.required]],
    });
  }

  getCategorieById(id: number) {
    this.categorie = this.service.getCategorieById(id);
    if (this.categorie) {
      this.categorieForm.patchValue({
        name: this.categorie.name,
        parent: this.categorie.parent,
        date: this.categorie.date
      });
    }
  }
  deleteCategorie() {
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#016017',
      cancelButtonColor: '#8a0613',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCategorie(this.categorieId);
        this.router.navigate(['categories']);
      }
    });
  }
  submitUpdate() {
    if (this.categorieForm.valid) {
      this.service.updateCategorie(this.categorieId, this.categorieForm.value);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Category has been Updated',
        confirmButtonColor: '#016017',
      });
      this.router.navigateByUrl("categories");
    } else {
      Swal.fire({
        text: "Error, can't update.",
        confirmButtonColor: '#8a0613',
      });
    }
  }

  get controls() {
    return this.categorieForm.controls;
  }
}
