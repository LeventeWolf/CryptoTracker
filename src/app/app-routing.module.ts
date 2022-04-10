import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)},
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  {path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  // {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
