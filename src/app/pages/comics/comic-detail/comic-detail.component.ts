import { CartService } from './../../../shared/cart-service/cart.service';
import { Comic, Creators } from './../../../models/comic.model';
import { filter, Observable, switchMap, map, tap } from 'rxjs';
import { ComicsApiService } from './../service/comics-api/comics-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit {

  constructor(
    private comicsService: ComicsApiService,
    private route: ActivatedRoute,
    private cartService: CartService

  ) {
  }

  comic$!: Observable<Comic>
  creators$!: Observable<Creators[]>
  quantity: number = 0


  ngOnInit() {
    this.comic$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.comicsService.getComicById(params.get('id')!))
    );
    this.getcomicWriter()
  }

  getcomicWriter(): any {

    this.creators$ = this.comic$.pipe(
      map(comic => comic.creators.items.
        filter(creator => creator.role === 'writer')),
        )
  }

  decreaseItemQuantity() {
    this.quantity--
  }

  increaseItemQuantity() {
    this.quantity++
  }

  addToCart(comic: Comic) {
    const product: Product = {
      id: comic.id,
      title: comic.title,
      prices: comic.prices,
      price: Number(comic.prices[0].price) * this.quantity,
      thumbnail: comic.thumbnail,
      quantity: this.quantity,
      coupon: false,
      rare: false
    };
    this.cartService.addToCart(product);
  }

}
