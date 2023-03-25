import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items = new BehaviorSubject<Product[]>([]);
  private cartTotalQuantity = new BehaviorSubject<number>(0);

  addToCart(product: Product) {
    const currentItems = this.items.getValue();
    const existingProductIndex = this.verifyItemIndex(currentItems, product)

    if (existingProductIndex !== -1) {
      currentItems[existingProductIndex].quantity += product.quantity;
      this.items.next(currentItems);
    } else {
      const newItems = [...currentItems, product];
      this.items.next(newItems);
        console.log(this.items.subscribe(res => console.log(res)))
    }
    this.cartTotalQuantity.next(this.cartTotalQuantity.getValue() + product.quantity)

  }

  verifyItemIndex(currentItems: Product[], product: Product) {
    return currentItems.findIndex(existingProduct => existingProduct.id === product.id);
  }

  getCartTotalItems() {
    return this.cartTotalQuantity.asObservable()
  }

  getItems() {
    return this.items.asObservable();
  }

  clearCart() {
    this.items.next([])
  }
}
