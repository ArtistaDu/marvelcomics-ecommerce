import { ComicsApiService } from './../../pages/comics/service/comics-api/comics-api.service';
import { CartService } from './../../shared/cart-service/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private cartService: CartService,
    private comicsService: ComicsApiService
    ) {}

  cartTotalQuantity$ = this.cartService.getCartTotalItems()

  fetchComicsData() {
    this.comicsService.fetchComics(0)
    // this.comicsService.getComics().subscribe(data => console.log(data))
  }
}
