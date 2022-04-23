import { Component, OnInit } from '@angular/core';
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

  email() {
    if (!firebase.auth().currentUser) {
      return null;
    }

    // @ts-ignore
    return firebase.auth().currentUser.email;
  }

  uid() {
    if (!firebase.auth().currentUser) {
      return null;
    }

    // @ts-ignore
    return firebase.auth().currentUser.uid
  }
}
