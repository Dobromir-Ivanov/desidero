import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationComponent } from './publication.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationService } from 'src/app/services/publication.service';
import { PublicationApiService } from 'src/app/services/publication.api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PublicationDetailComponent } from './publication-detail/publication-detail.component';
import { PublicationRoutes } from './publication.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PublicationRoutes
  ],
  declarations: [
    PublicationComponent,
    PublicationListComponent,
    PublicationDetailComponent
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
