import { map, switchMap } from 'rxjs/operators';
import { Category } from './../dto/category';
import { Observable, of } from 'rxjs';
import { Publication } from './../dto/publication';
import { Injectable } from '@angular/core';
import { PublicationApiService } from './publication.api.service';
import { User } from '../dto';

@Injectable()
export class PublicationService {


  constructor(private publicationApiService: PublicationApiService) { }

  getAll(): Observable<Publication[]> {
    return this.publicationApiService.getAllPublication();
  }

  getById(id: number): Observable<Publication> {
    return this.publicationApiService.getPublicationById(id);
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


  getPublicationCategories(): Observable<Category[]> {
    return this.publicationApiService.getPublicationCategories();
  }

  getPublicationAuthor(authorId: string): Observable<User> {
    const fakeUser = new User();
    fakeUser.id = authorId;
    fakeUser.userName = "Pippo"

    return of(fakeUser);
  }

}
