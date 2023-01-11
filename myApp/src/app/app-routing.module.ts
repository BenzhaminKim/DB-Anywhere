import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseCreateComponent } from './database-create/database-create.component';
import { DatabaseDetailComponent } from './database-detail/database-detail.component';
import { DatabaseListComponent } from './database-list/database-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: 'databases', component: DatabaseListComponent },
  { path: 'database/create', component: DatabaseCreateComponent },
  { path: 'database/:id', component: DatabaseDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
