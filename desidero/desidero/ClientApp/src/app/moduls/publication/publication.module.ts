import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PublicationRoutes } from './publication.routing';

import { PublicationApiService, PublicationService } from './services/';

import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationCreateComponent } from './publication-create/publication-create.component';
import { PublicationDetailComponent } from './publication-detail/publication-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PublicationRoutes
  ],
  declarations: [
    PublicationListComponent,
    PublicationDetailComponent,
    PublicationCreateComponent
  ],
  exports: [
    PublicationListComponent,
  ],
  providers: [
    PublicationService,
    PublicationApiService
  ]
})
export class PublicationModule { }
