import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', component: AuthorizationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
