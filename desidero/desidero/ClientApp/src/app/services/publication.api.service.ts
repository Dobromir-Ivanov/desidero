import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataCategories } from '../data-fake';
import { Category, Publication } from '../dto';

import { DataPublications } from './../data-fake/data-publication';

@Injectable()
export class PublicationApiService {



  constructor() { }


  getAllPublication(): Observable<Publication[]> {
    return of(DataPublications);
  }


  getPublicationCategories(): Observable<Category[]> {
    return of(DataCategories);
  }


  getPublicationById(id: number): Observable<Publication> {
    return of(DataPublications.find(p => p.id === id));
  }


}
