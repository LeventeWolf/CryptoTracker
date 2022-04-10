import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>

  constructor() {
    this.currentUser = new Observable<User>();
  }


}
