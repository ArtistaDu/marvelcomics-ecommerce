import { CartService } from './../../shared/cart-service/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private cartService: CartService) {}

  cartTotalQuantity$ = this.cartService.getCartTotalItems()
}
