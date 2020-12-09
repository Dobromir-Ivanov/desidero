/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PublicationApiService } from './publication.api.service';

describe('Service: PublicationApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicationApiService]
    });
  });

  it('should ...', inject([PublicationApiService], (service: PublicationApiService) => {
    expect(service).toBeTruthy();
  }));
});
