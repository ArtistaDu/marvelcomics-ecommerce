import { Comic, Creators } from './../../../models/comic.model';
import { filter, Observable, switchMap, map, tap } from 'rxjs';
import { ComicsApiService } from './../service/comics-api/comics-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit {

  constructor(
    private comicsService: ComicsApiService,
    private route: ActivatedRoute

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

}
