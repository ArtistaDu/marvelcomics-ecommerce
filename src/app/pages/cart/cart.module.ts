import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { CartRoutingModule } from './cart-routing.module';



@NgModule({
  declarations: [
    CartViewComponent,
    CartProductComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
