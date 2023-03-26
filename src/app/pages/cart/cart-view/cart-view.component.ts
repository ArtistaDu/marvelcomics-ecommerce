import { OrderCompletedComponent } from './../order-completed/order-completed.component';
import { CartService } from './../../../shared/cart-service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {

  cartItems$!: Observable<Product[]>
  cartSubtotal$!: Observable<number | null>


  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getItems()
    this.cartSubtotal$ = this.cartService.getSubtotal()
  }

  async checkout() {
    await this.router.navigateByUrl('/comics')
    this.cartService.clearCart()
    this.cartService.updateCartTotalQuantity()
    this.openConfirmationDialog()
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(OrderCompletedComponent, {
      panelClass: "dialog-responsive",
    });
    dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        dialogRef.close();
      }, 1500)
    })
  }
}

