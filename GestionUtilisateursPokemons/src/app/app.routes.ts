import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';
import { LoginComponentComponent } from './pages/login-component/login-component.component';
import { NgModule } from '@angular/core';
export const routes: Routes = [
  { path: 'login', component: LoginComponentComponent},
 { path: 'dashboard', loadChildren: () => import('./pages/dashboard-module/dashboard-module.module').then(m => m.DashboardModuleModule),canActivate: [AuthGuard] },
 { path: 'users', loadChildren: () => import('./pages/users-module/users-module.module').then(m => m.UsersModuleModule),canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
