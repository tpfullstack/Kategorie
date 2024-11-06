import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/Services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-categorie',
  templateUrl: './details-categorie.component.html',
  styleUrls: ['./details-categorie.component.css']
})
export class DetailsCategorieComponent implements OnInit {

  categorieForm!: FormGroup;
  categorieId!: number;
  categorie: any = null;

  constructor(
    private service: MainService,
    public router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categorieId = +this.activatedRoute.snapshot.params['id'];
    this.initForm();
    this.getCategorieById(this.categorieId);
  }

  initForm() {
    this.categorieForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      parent: [{ value: '', disabled: true }, [Validators.required]],
      date: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  getCategorieById(id: number) {
    this.categorie = this.service.getCategorieById(id);
    if (this.categorie) {
      const formattedDate = this.formatDate(this.categorie.date);
      setTimeout(() => {
        this.categorieForm.patchValue({
          name: this.categorie.name,
          parent: this.categorie.parent,
          date: formattedDate
        });
      }, 100); // Délai léger pour assurer la mise à jour
    } else {
      Swal.fire({
        title: 'Oops...',
        text: 'Categorie not found!',
        footer: '<a href="/categories">Back to Categories</a>'
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
  // Fonction pour convertir la date au format YYYY-MM-DD
  formatDate(date: string): string {
     const [day, month, year] = date.split('-');
     return `${year}-${month}-${day}`;
}
}
