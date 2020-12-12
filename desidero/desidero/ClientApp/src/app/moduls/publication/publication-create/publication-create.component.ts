import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { Publication, User, Category } from 'src/app/dto';

import { Utilities } from 'src/app/utilities';
import { Configuration } from 'src/app/config';

import { PublicationService } from '../services/';
import { AuthService } from 'src/app/core/services';


@Component({
  selector: 'app-publication-create',
  templateUrl: './publication-create.component.html',
  styleUrls: ['./publication-create.component.scss']
})
export class PublicationCreateComponent implements OnInit {

  submitted: boolean = false;
  isLoading: boolean;
  categories$: Observable<Category[]>;
  currentUser: User;


  constructor(
    private publicationService: PublicationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categories$ = this.publicationService.getPublicationCategories();
    this.currentUser = this.authService.currentUser;
  }

  public onSubmit(form: NgForm) {
    this.submitted = true;


    const newItem: Publication = new Publication();
    newItem.description = form.value.description;
    newItem.title = form.value.title;
    newItem.categoryId = (form.value.category as Category).id;
    newItem.authorId = this.currentUser?.id;
    newItem.createOn = Utilities.convertDateToUTC(new Date());

    // stop here if form is invalid
    if (form.invalid) { return; }

    this.isLoading = true;

    this.publicationService.createPublication(newItem).subscribe(
      (post: Publication) => {
        this.isLoading = false
        const url = Configuration.publicationDetialUrl + `/${post.id}`
        this.router.navigateByUrl(url);
      },
      (error) => alert(error)
    )

  }



}
