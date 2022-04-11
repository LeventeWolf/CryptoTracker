import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import firebase from 'firebase/compat';
import {filter} from "rxjs";
// @ts-ignore
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CryptoTracker';
  page = '';
  routes: Array<string> = [];
  // @ts-ignore
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });

    this.authService.isUserLoggedIn().subscribe((user: firebase.User | null | undefined) => {
      console.log(user)
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, (error: any) => {
      console.log(error);
      localStorage.setItem('user', JSON.stringify('null'))
    });
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }
}
