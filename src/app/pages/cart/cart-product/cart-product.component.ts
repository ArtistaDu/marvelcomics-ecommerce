import { CartService } from './../../../shared/cart-service/cart.service';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {

  quantityOptions: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  quantityControl!: FormControl
  couponCodeControl: FormControl = new FormControl('')
  message!: string
  @Input() product!: Product
  basePrice!: number
  @Input() index!: number;


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.basePrice = Number(this.product.prices[0].price)
    this.quantityControl = new FormControl(this.product.quantity)
    this.quantityControl.valueChanges.subscribe(value => {
      this.product.quantity = value
      if (!value) {
        this.removeItem(this.product)
      }
      this.updatePrice(value)
      this.cartService.updateCartTotalQuantity()
      this.cartService.updateCartSubtotal()
    })
  }

  applyCoupon() {
    const code = this.couponCodeControl.value

    if (this.product.rare) {
      if (code === 'rarecomic#123') {
        this.cupounAppliedState()
      } else {
        this.message = 'Invalid coupon.'
      }
    } else {
      if (code === 'regularcomic#456') {
        this.cupounAppliedState()
      } else {
        this.message = 'Invalid coupon.'
      }
    }
  }

  cupounAppliedState() {
    this.product.coupon = true
    this.couponCodeControl.disable()
    this.message = 'Coupon Applied'
    this.product.price = this.product.price - (this.product.price * 0.1)
    this.cartService.updateCartSubtotal()
  }

  updatePrice(quantity: number) {
    if (this.product.coupon) {
      const newPrice = this.basePrice * quantity
      this.product.price = newPrice - (newPrice * 0.1)
    } else {
      this.product.price = this.basePrice * quantity
    }
  }

  removeItem(product: Product) {
    this.cartService.removeItem(product)
  }
}


