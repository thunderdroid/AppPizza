import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Redirigir a la página de login por defecto
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule),
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
  },
  {
    path: 'bebidas',
    loadChildren: () => import('./bebidas/bebidas.module').then(m => m.BebidasPageModule),
  },
  {
    path: 'acompanamientos',
    loadChildren: () => import('./acompanamientos/acompanamientos.module').then(m => m.AcompanamientosPageModule),
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosPageModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
  },
  {
    path: 'encuentranos',
    loadChildren: () => import('./encuentranos/encuentranos.module').then( m => m.EncuentranosPageModule)
  },
  {
    path: 'direcciones',
    loadChildren: () => import('./direcciones/direcciones.module').then( m => m.DireccionesPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}


