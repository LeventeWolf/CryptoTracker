import { Component, OnInit } from '@angular/core';
import {TradeService} from "../../shared/services/trade.service";
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

  constructor(private tradesService: TradeService) {
    this.user = JSON.parse(localStorage['user']);

    tradesService.getNumberOfTradesByUserID(this.user.uid).subscribe(trades => {
      this.tradesLength = trades.length;
    });
  }


  ngOnInit(): void {
  }

}
