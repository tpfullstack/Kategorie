import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './Components/categories/categories.component';
import { AddCategorieComponent } from './Components/add-categorie/add-categorie.component';
import { DetailsCategorieComponent } from './Components/details-categorie/details-categorie.component';
import { UpdateCategorieComponent } from './Components/update-categorie/update-categorie.component';
import { KeycloakAuthGuard } from 'keycloak-angular';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:"categories", pathMatch: "full" },
  {path:'categories', component: CategoriesComponent },
  {path:'categories/:id', component: DetailsCategorieComponent },
  {path:'addcategory', component: AddCategorieComponent, canActivate: [AuthGuard] },
  {path:'update/:id', component: UpdateCategorieComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
