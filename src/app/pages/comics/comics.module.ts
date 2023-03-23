import { ComicsRoutingModule } from './comics-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicCardComponent } from './comic-card/comic-card.component';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ComicsListComponent,
    ComicDetailComponent,
    ComicCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComicsRoutingModule
  ]
})
export class ComicsModule { }
