import { AuthService } from 'src/app/services/';
import { PublicationService } from './../../../services/publication.service';
import { Component, OnInit } from '@angular/core';
import { Category, Publication } from 'src/app/dto';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/config';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  publicationList: Publication[];

  private categories: Category[];

  constructor(
    private publicationService: PublicationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    from(this.publicationService.getPublicationCategories()).pipe(
      switchMap((categories) => {
        this.categories = categories;
        return this.publicationService.getAll();
      })
    ).subscribe(
      (items) => this.publicationList = items
    );
  }

  selectPublicationHendler(item: Publication) {
    // if (this.authService.isLoggedIn) {
    const url = `wp-admin/publication/detail/${item.id}`;
    this.router.navigateByUrl(url);
    //} else {
    //  alert('Трябва да влезеш в системата за да детайли на публикацията.');
    //}
  }

  getCategoryName(id: number): string {
    return this.categories.find(c => c.id === id)?.title || '-';
  }


  getPublicationData(item: Publication) {
    return item.createOn.toUTCString();
  }

}
