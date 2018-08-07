import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '../../node_modules/@angular/router';

import { ContactComponent } from './pages/contact/contact.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { RoutingRoutingModule } from './routing/routing-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    NotFound404Component,
    ContactsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
