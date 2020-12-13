import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-wp-admin',
  templateUrl: './wp-admin.component.html',
  styleUrls: ['./wp-admin.component.scss']
})
export class WpAdminComponent implements OnInit {

  loading = false;



  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {

      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {


  }

}
