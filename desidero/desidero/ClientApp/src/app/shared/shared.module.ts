import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../vendor/prime-ng/prime-ng.module';


@NgModule({
  exports: [
    FormsModule,
    PrimeNgModule,
  ]
})
export class SharedModule { }
