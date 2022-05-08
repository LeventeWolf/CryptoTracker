import {Component, OnInit} from '@angular/core';
import {Trade} from "../../shared/models/trade";
import {TradeService} from "../../shared/services/trade.service";
import firebase from "firebase/compat/app";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {delay} from "../../app.component";

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {
  trades: Trade[] = [];

  constructor(private tradesService: TradeService) {
    const userID = JSON.parse(localStorage['user']).uid;

    tradesService.getAllByUserID(userID).subscribe(trades => {
      this.trades = trades;
    });
  }

  ngOnInit(): void {
  }

  uid() {
    if (!firebase.auth().currentUser) {
      return null;
    }

    // @ts-ignore
    return firebase.auth().currentUser.uid
  }

  calculateClass(type: 'buy' | 'sell') {
    return [type];
  }

  calculateClassStatus(type: "buy" | "sell") {
    return ['status-' + type];
  }

  onDelete(id: string) {
    this.tradesService.delete(id);
  }

}
