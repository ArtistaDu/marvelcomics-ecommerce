import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Comic } from 'src/app/models/comic.model';
import { ComicsApiService } from '../service/comics-api/comics-api.service';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})

export class ComicsListComponent implements OnInit{
  searchInput = new FormControl()
  comics$!: Observable<Comic[]>
  totalComicsResults!: number
  pageSize = 20;
  currentPage = 0;

  constructor(
    private comicsService: ComicsApiService,
    private router: Router
    ) {}

  ngOnInit(): void {
      this.getComics()
      this.setTotalComicsResults()
  }

  setTotalComicsResults() {
    this.comicsService.getTotalComicsResults().subscribe(
      data => this.totalComicsResults = data
    )
  }

  getComics() {
    this.comics$ = this.comicsService.getComics(0)
  }

  onPageChange(event: PageEvent) {
    const searchValue = this.searchInput.value
    this.currentPage = event.pageIndex;

    if (this.searchInput.value) {
      this.comics$ = this.comicsService.getComicsByName(searchValue, this.currentPage * this.pageSize)
    } else {
      this.comics$ = this.comicsService.getComics(this.currentPage * this.pageSize);

    }
  }

  searchComic() {
    const value = this.searchInput.value

    if (value) {
      this.comics$ = this.comicsService.getComicsByName(value, 0)

    } else {
      this.getComics()
    }
  }

  routeComic(id: string) {
    console.log('chamou')
    this.router.navigateByUrl(`comics/${id}`);
  }

}
