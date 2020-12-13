import { Category } from '../../../dto/category';
import { Observable, of } from 'rxjs';
import { Publication } from '../../../dto/publication';
import { Injectable } from '@angular/core';
import { PublicationApiService } from './publication.api.service';
import { User } from '../../../dto';
import { delay } from 'rxjs/operators';

@Injectable()
export class PublicationService {



  constructor(private publicationApiService: PublicationApiService) { }

  getAll(param?: any): Observable<Publication[]> {
    return this.publicationApiService.getAllPublication(param).pipe(
      // delay(3000)
    )
  }

  /* getPublicationByUser(userId: string): any {
    throw new Error('Method not implemented.');
  } */

  getById(id: number): Observable<Publication> {
    return this.publicationApiService.getPublicationById(id);
  }

  getByCategory(category: Category): Observable<Publication[]> {
    return of([]);
  }

  createPublication(item: Publication): Observable<Publication> {
    return this.publicationApiService.createPublication(item);
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
