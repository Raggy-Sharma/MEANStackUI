import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
