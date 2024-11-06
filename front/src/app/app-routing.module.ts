import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './Components/categories/categories.component';
import { AddCategorieComponent } from './Components/add-categorie/add-categorie.component';

const routes: Routes = [
  {path:'', redirectTo:"categories", pathMatch: "full" },
  {path:'categories', component: CategoriesComponent },
  {path:'addcategorie', component: AddCategorieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
