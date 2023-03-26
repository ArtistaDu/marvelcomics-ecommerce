import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { CartRoutingModule } from './cart-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderCompletedComponent } from './order-completed/order-completed.component';
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
  declarations: [
    CartViewComponent,
    CartProductComponent,
    OrderCompletedComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class CartModule { }
