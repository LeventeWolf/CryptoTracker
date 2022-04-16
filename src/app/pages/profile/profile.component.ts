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


function transform(value: string, args: any[]): string {
  const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
  const trail = args.length > 1 ? args[1] : '...';
  return value.length > limit ? value.substring(0, limit) + trail : value;
}
