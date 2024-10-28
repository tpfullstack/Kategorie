import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Components/error/error.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { AddCategorieComponent } from './Components/add-categorie/add-categorie.component';
import { CategorieDetailsComponent } from './Components/categorie-details/categorie-details.component';

const routes: Routes = [
  {path:'', redirectTo:"categories", pathMatch: "full" },
  {path:'categories', component: CategoriesComponent },
  {path:'addcategorie', component: AddCategorieComponent },
  {path:'categories/:id', component: CategorieDetailsComponent },
  {path:'update/:id', component: AddCategorieComponent },
  {path:'**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
