import { Component, Input, OnInit } from '@angular/core';
import { Comic, Creators } from 'src/app/models/comic.model';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss']
})


export class ComicCardComponent implements OnInit {
  @Input() comic!: Comic

  constructor() { }

  ngOnInit() {
  }

  get comicWriter(): Creators[] {
    const writers = this.comic.creators.items.filter(
      item => item.role == 'writer'
    )
    return writers
 }

}





