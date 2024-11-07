import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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

@NgModule({ declarations: [
        AppComponent,
        CategoriesComponent,
        AddCategorieComponent,
        DetailsCategorieComponent,
        UpdateCategorieComponent,
        HeaderComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule,
        BrowserAnimationsModule], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
