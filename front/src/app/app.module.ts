import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// Components
import { AppComponent } from './app.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { AddCategorieComponent } from './Components/add-categorie/add-categorie.component';
import { DetailsCategorieComponent } from './Components/details-categorie/details-categorie.component';
import { UpdateCategorieComponent } from './Components/update-categorie/update-categorie.component';

import { HeaderComponent } from './Components/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderInterceptor } from './core/helpers/loader.interceptor';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';



function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:9080/',
        realm: 'jhipster',
        clientId: 'front'
      },
      initOptions: {
        onLoad: 'check-sso',
      }
    });
}


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    AddCategorieComponent,
    DetailsCategorieComponent,
    UpdateCategorieComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    NgxSpinnerModule,
    BrowserAnimationsModule,
    KeycloakAngularModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
