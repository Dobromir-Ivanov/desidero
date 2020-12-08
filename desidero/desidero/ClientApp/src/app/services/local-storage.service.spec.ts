/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStorage } from './local-storage.service';

describe('Service: LocalStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorage]
    });
  });

  it('should ...', inject([LocalStorage], (service: LocalStorage) => {
    expect(service).toBeTruthy();
  }));
});
