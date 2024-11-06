import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/Services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {

  categorieForm!: FormGroup;
  categorieId!: number;
  categorie!: any;

  constructor(private service: MainService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      console.log('update');
      this.categorieId = this.activatedRoute.snapshot.params['id'];
      this.getCategorieById(this.categorieId);
      this.initFormAdd();
    } else {
      console.log('add');
      this.initFormAdd();
    }
  }

  initFormAdd() {
    this.categorieForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      parent: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      date: [null, [Validators.required]],
    });
  }

  initFormUpdate() {
    this.categorieForm = this.formBuilder.group({
      name: [this.categorie.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      parent: [this.categorie.parent, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      date: [this.categorie.date, [Validators.required]],
    });
  }

  getCategorieById(id: number) {
    // Puisque tu utilises des données locales, tu peux récupérer les données directement
    this.categorie = this.service.getCategorieById(id);
    this.initFormUpdate();
  }

  get controls() {
    return this.categorieForm.controls;
  }

  submitAdd() {
    if (!this.categorieId) {
      if (this.categorieForm.valid) {
        let newCategorie = this.categorieForm.value;
        console.log(newCategorie);
        // Pas de subscribe nécessaire avec des données locales
        this.service.addCategorie(newCategorie);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Category has been Added',
          confirmButtonColor: '#016017',
        });
        this.router.navigateByUrl("categories");
      } else {
        this.showErrorAlert('add');
      }
    } else {
      if (this.categorieForm.valid) {
        this.service.updateCategorie(this.categorieId, this.categorieForm.value);
        Swal.fire({
          position: 'center',
          title: 'Category has been Updated',
          showConfirmButton: false,
        });
      } else {
        this.showErrorAlert('update');
      }
    }
  }

  showErrorAlert(action: string) {
    Swal.fire({
      text: `Error, can't ${action}.`,
      confirmButtonColor: '#8a0613',
    });
  }
}
