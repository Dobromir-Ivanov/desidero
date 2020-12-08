import { Category } from './../dto/category';
import { Observable, of } from 'rxjs';
import { Publication } from './../dto/publication';
import { Injectable } from '@angular/core';

@Injectable()
export class PublicationService {

  constructor() { }

  getAll(): Observable<Publication[]> {
    return of([]);
  }

  getById(id: number): Observable<Publication> {
    return of(null);
  }

  getByCategory(category: Category): Observable<Publication[]> {
    return of([]);
  }

  createPublication(item: Publication): Observable<Publication> {
    return of(null);
  }

  deletePublication(item: Publication): Observable<any> {
    return of(null);
  }


  editPublication(item: Publication): Observable<Publication> {
    return of(null);
  }

}
