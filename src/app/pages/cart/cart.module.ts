import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartViewComponent,
    CartProductComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
