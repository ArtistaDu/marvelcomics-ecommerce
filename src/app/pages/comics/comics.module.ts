import { NgxSpinnerModule } from 'ngx-spinner';
import { ComicsRoutingModule } from './comics-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicCardComponent } from './comic-card/comic-card.component';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';





@NgModule({
  declarations: [
    ComicsListComponent,
    ComicDetailComponent,
    ComicCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComicsRoutingModule,
    MatPaginatorModule,
    NgxSpinnerModule,
  ],

})
export class ComicsModule { }
