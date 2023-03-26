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
  @Input() product!: Product
  @Input() index!: number;


  constructor(private cartService:CartService) {}

  ngOnInit() {
    this.quantityControl = new FormControl(this.product.quantity)
    this.quantityControl.valueChanges.subscribe(value => {
      this.product.quantity = value
      this.cartService.updateCartTotalQuantity()
    })
  }
}


