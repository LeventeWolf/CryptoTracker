import { Component, OnInit } from '@angular/core';
import {TradeService} from "../../shared/services/trade.service";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tradesLength: number = 0;
  favouritesLength: number = 0;
  user!: User;

  constructor(private tradesService: TradeService, private userService: UserService) {
    const local_user = JSON.parse(localStorage['user']);

    tradesService.getNumberOfTradesByUserID(local_user.uid).subscribe(trades => {
      this.tradesLength = trades.length;
    });

    userService.getById(local_user.uid).subscribe(user => {
      this.user = user as User;
    })
  }

  ngOnInit(): void {
  }

}
