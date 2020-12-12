import { environment } from 'src/environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  get appTitle(): string {
    return environment.appTitle;
  }

  constructor() { }

  getYear() {
    return new Date().getUTCFullYear();
  }

}
