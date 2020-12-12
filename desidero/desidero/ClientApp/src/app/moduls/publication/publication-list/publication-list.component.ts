import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Configuration } from 'src/app/config';

import { Category, Publication } from 'src/app/dto';

import { MessagesService, AuthService } from 'src/app/core/services';
import { PublicationService } from '../services/';


@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit, OnDestroy {

  publicationList: Publication[];

  categories$: Observable<Category[]>;

  private queryParamsSubscription: Subscription;

  constructor(
    private publicationService: PublicationService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private msessagesService: MessagesService
  ) { }


  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  ngOnInit() {

    this.categories$ = this.publicationService.getPublicationCategories();

    this.queryParamsSubscription = this.activatedRoute.queryParams.pipe(
      switchMap((param) => this.publicationService.getAll(param))
    ).subscribe(
      (items) => this.publicationList = items
    )
  }


  selectPublicationHendler(item: Publication) {
    if (this.authService.isLoggedIn) {
      const url = Configuration.publicationDetialUrl + `/${item.id}`;
      this.router.navigateByUrl(url);
    } else {
      this.msessagesService.alertInfo('Трябва да влезеш в системата за повече детайли на публикацията.');
    }
  }

  getCategoryName(id: number, categories: Category[]): string {
    return categories.find(c => c.id === id)?.title || '-';
  }


  getPublicationData(item: Publication) {
    return item.createOn.toUTCString();
  }

}
