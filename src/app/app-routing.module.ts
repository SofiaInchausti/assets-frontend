import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewComponent } from './components/new/new.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path:'dashboard', component:DashboardComponent },
  { path:'new', component: NewComponent },
  { path:'edit/:id', component:EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent,NewComponent,EditComponent]
