import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit{
  search = new FormControl()

  ngOnInit(): void {
      this.searchComic()
  }

  searchComic() {

  }
}
