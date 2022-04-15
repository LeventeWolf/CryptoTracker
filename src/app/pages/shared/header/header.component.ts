import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Input() loggedInUser?: firebase.default.User | null;
  @Input() drawer?: MatDrawer;

  constructor(private authService: AuthService) {
  }

  menuSwitch(page: string) {
    this.selectedPage.emit(page);
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Logged out successfully!')
    }).catch((error: any) => {
      console.log(error)
    });
  }

  toggleSidenav() {
    this.drawer?.open();
  }

}
