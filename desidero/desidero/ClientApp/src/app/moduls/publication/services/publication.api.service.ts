import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, Publication } from 'src/app/dto';

import { DataCategories } from 'src/app/data-fake';
import { DataPublications } from 'src/app/data-fake/data-publication';

@Injectable()
export class PublicationApiService {

  private _storePublication: Publication[] = DataPublications;

  constructor() { }


  getAllPublication(param?: any): Observable<Publication[]> {
    const userId = param?.userId;
    const publications$ = of(this._storePublication)

    if (!!userId) {
      return publications$.pipe(
        map((items) => items.filter(pub => pub.authorId === userId))
      )
    }

    return publications$;
  }


  getPublicationCategories(): Observable<Category[]> {
    return of(DataCategories);
  }


  getPublicationById(id: number): Observable<Publication> {
    return of(this._storePublication.find(p => p.id === id));
  }


  createPublication(item: Publication): Observable<Publication> {
    return of(item).pipe(
      map(publication => {
        publication.id = this._storePublication.length + 1;
        return publication
      }),
      tap((pub) => {
        this._storePublication = [...this._storePublication, pub]
      })
    )
  }


}
