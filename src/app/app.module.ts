import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactComponent } from './pages/contact/contact.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { RoutingRoutingModule } from './routing/routing-routing.module';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './structure/header/header.component';
import { FullListComponent } from './pages/full-list/full-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    NotFound404Component,
    MainComponent,
    HeaderComponent,
    FullListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
