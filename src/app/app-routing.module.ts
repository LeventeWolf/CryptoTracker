import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)},
  // {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  // {path: 'register', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  // {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
