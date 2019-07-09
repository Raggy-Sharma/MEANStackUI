import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: "home",
    loadChildren: '././home/home.module#HomeModule'
  },
  {
    path: 'register',
    loadChildren: '././register/register.module#RegisterModule'
  },
  {
    path: 'login',
    loadChildren: '././login/login.module#LoginModule'
  },
  {
    path: 'userProfile',
    loadChildren: '././user-profile/user-profile.module#UserProfileModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
