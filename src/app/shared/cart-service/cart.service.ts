import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items = new BehaviorSubject<Product[]>([]);
  private cartTotalQuantity = new BehaviorSubject<number | null>(null);
  private cartSubtotal = new BehaviorSubject<number | null>(null);



  addToCart(product: Product) {
    const currentItems = this.items.getValue();
    const existingProductIndex = this.verifyItemIndex(currentItems, product)

    if (existingProductIndex !== -1) {
      currentItems[existingProductIndex].quantity += product.quantity;
      currentItems[existingProductIndex].price = Number(product.prices[0].price) * currentItems[existingProductIndex].quantity;
      this.items.next(currentItems);

    } else {
      const newItems = [...currentItems, product];
      this.items.next(newItems);
    }
    this.updateCartTotalQuantity()
    this.updateCartSubtotal();
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

  getSubtotal() {
    return this.cartSubtotal.asObservable()
  }

  updateCartSubtotal() {
    const currentItems = this.items.getValue();
    const subtotal = currentItems.reduce((acc, item) => acc + item.price, 0);
    this.cartSubtotal.next(subtotal);
  }

  updateCartTotalQuantity() {
    const currentItems = this.items.getValue();
    const totalQuantity = currentItems.reduce((acc, item) => acc + item.quantity, 0);
    this.cartTotalQuantity.next(totalQuantity);
  }

  removeItem(product: Product) {
    const currentItems = this.items.getValue();
    const itemIndex = this.verifyItemIndex(currentItems, product);

    if (itemIndex !== -1) {
      currentItems.splice(itemIndex, 1);
      this.items.next(currentItems);
      this.updateCartTotalQuantity();
      this.updateCartSubtotal();
    }
  }

  clearCart() {
    this.items.next([])
    this.cartSubtotal.next(0);
  }
}
