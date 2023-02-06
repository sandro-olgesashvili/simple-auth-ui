import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthguardGuard } from './service/authguard.guard';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', component: AuthorizationComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'update', component: UpdateComponent, },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthguardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
