/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { User.apiService } from './user.api.service';

describe('Service: User.api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [User.apiService]
    });
  });

  it('should ...', inject([User.apiService], (service: User.apiService) => {
    expect(service).toBeTruthy();
  }));
});
