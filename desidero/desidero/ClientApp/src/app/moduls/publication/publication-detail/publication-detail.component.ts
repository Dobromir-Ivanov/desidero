import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Category, Publication, User } from 'src/app/dto';
import { PublicationService } from 'src/app/services/';

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.scss']
})
export class PublicationDetailComponent implements OnInit {

  author$: Observable<User>
  publication$: Observable<Publication>;
  categories$: Observable<Category[]>;

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
  ) {
  }


  ngOnInit() {
    this.categories$ = this.publicationService.getPublicationCategories();

    this.publication$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.publicationService.getById(Number.parseInt(params.get('id')))),
      tap(item => this.author$ = this.publicationService.getPublicationAuthor(item.authorId))
    );
  }


  getCategoryName(id: number, categories: Category[]): string {
    return categories.find(c => c.id === id)?.title || '-';
  }


  getPublicationData(item: Publication) {
    return item.createOn.toUTCString();
  }


}
