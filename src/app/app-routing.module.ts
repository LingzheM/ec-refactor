import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './core/register/register.component';

const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./core/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./core/login/login.component').then(m => m.LoginComponent),
    //canActivate: [AuthGuard]
  },
  { 
    path: 'products', 
    loadChildren: () => 
      import('./features/products/products.module').then(m => m.ProductsModule),
    //canActivate: [AuthGuard]
   }, 
   { 
    path: 'cart', 
    loadChildren: () => 
      import('./features/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard]
   }, 
   { 
    path: 'checkout', 
    loadChildren: () => 
      import('./features/checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [AuthGuard]
   },
   { path: '', redirectTo: 'login', pathMatch: 'full' }, 
   { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
