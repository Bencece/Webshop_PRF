import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { HomepageComponent } from './homepage/homepage.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'homepage', component: HomepageComponent, canActivate : [AuthGuard]},
  {path: 'products', component: ProductsComponent, canActivate : [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate : [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
