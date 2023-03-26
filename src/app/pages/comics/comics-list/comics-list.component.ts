import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Comic } from 'src/app/models/comic.model';
import { ComicsApiService } from '../service/comics-api/comics-api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})

export class ComicsListComponent implements OnInit {
  searchInput = new FormControl()
  comics$!: Observable<Comic[] | undefined>
  totalComicsResults!: number
  pageSize = 20;
  currentPage = 0;

  constructor(
    public comicsService: ComicsApiService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show()
    this.comics$ = this.comicsService.getComics()
    this.getComics()
    this.setTotalComicsResults()
  }

  setTotalComicsResults() {
    this.comicsService.getTotalComicsResults().subscribe(
      data => this.totalComicsResults = data
    )
  }

  getComics() {
    this.comicsService.fetchComics(0)
  }

  onPageChange(event: PageEvent) {
    const searchValue = this.searchInput.value
    this.currentPage = event.pageIndex;

    if (this.searchInput.value) {
      this.comicsService.getComicsByName(searchValue, this.currentPage * this.pageSize)
    } else {
      this.comicsService.fetchComics(this.currentPage * this.pageSize);

    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  searchComic() {
    const value = this.searchInput.value

    if (value) {
      this.comicsService.getComicsByName(value, 0)

    } else {
      this.getComics()
    }
  }

  routeComic(id: string) {
    this.router.navigateByUrl(`comics/${id}`);
  }

}
