import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFound404Component } from '../pages/not-found404/not-found404.component';
import { AppComponent } from '../app.component';
import { ContactsComponent } from '../pages/contacts/contacts.component';
import { MainComponent } from '../pages/main/main.component';
import { ContactComponent } from '../pages/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact/:id', component: ContactComponent },
  { path: '404', component: NotFound404Component },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }