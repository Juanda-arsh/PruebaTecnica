import { Routes } from '@angular/router';
import { authChildGuard, authGuard } from './core/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { CarCreatePageComponent } from './pages/car-create/car-create-page.component';
import { CarEditPageComponent } from './pages/car-edit/car-edit-page.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    children: [
      { path: '', component: DashboardPageComponent },
      { path: 'cars/new', component: CarCreatePageComponent },
      { path: 'cars/:id/edit', component: CarEditPageComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
