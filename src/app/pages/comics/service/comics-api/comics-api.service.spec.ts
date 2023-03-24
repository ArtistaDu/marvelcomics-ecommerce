/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComicsApiService } from './comics-api.service';

describe('Service: ComicsApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComicsApiService]
    });
  });

  it('should ...', inject([ComicsApiService], (service: ComicsApiService) => {
    expect(service).toBeTruthy();
  }));
});
