/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ComicCardComponent } from './comic-card.component';

describe('ComicCardComponent', () => {
  let component: ComicCardComponent;
  let fixture: ComponentFixture<ComicCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
