import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeComponent } from './tree/tree.component';
import { ViewComponent } from './view/view.component';
import { Learn2Component } from './learn2/learn2.component';

const routes: Routes = [
  { path: 'home', component: Learn2Component },
  { path: 'view/:id', component: ViewComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
