import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewComponent } from './components/new/new.component';
import { EditComponent } from './components/edit/edit.component';
import { NewDevComponent } from './components/new-dev/new-dev.component';
import { EditDevComponent } from './components/edit-dev/edit-dev.component';

const routes: Routes = [
  { path:'dashboard', component:DashboardComponent },
  { path:'new', component: NewComponent },
  { path:'edit/:id', component:EditComponent },
  { path:'edit-dev/:id', component:EditDevComponent },
  { path:'new-dev', component: NewDevComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent,NewComponent,EditComponent, NewDevComponent, EditDevComponent]
