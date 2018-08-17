import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFound404Component } from '../pages/not-found404/not-found404.component';
import { AppComponent } from '../app.component';
import { MainComponent } from '../pages/main/main.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { FullListComponent } from '../pages/full-list/full-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'contact/:id', component: ContactComponent },
  { path: 'fullList', component: FullListComponent },
  { path: '404', component: NotFound404Component },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }
