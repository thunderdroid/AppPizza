import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { authLocalGuard } from '../guards/noauthlocal.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    component: LoginPage
  },
{ 
  path: 'login',
  loadChildren: () => import('/login/login.module').then( m => m.LoginPageModule),
  canActivate: [authLocalGuard]
},
{ 
  path: 'menu',
  loadChildren: () => import('/login/login.module').then( m => m.LoginPageModule),
  canActivate: [authLocalGuard]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
