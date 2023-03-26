import { CartService } from './../../../shared/cart-service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {

  cartItems$!: Observable<Product[]>
  cartSubtotal$!: Observable<number | null>


  constructor(public cartService: CartService) {

  }

  ngOnInit(): void {
      this.cartItems$ = this.cartService.getItems()
      this.cartSubtotal$ = this.cartService.getSubtotal()
  }
}
