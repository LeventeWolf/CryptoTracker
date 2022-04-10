import {Component, OnInit} from '@angular/core';
import {Coin, fetchCoins} from '../main.component';

@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss']
})
export class CryptoTableComponent implements OnInit {
  public coins: Coin[] = [];

  constructor() {}

  async ngOnInit(): Promise<void> {
    await fetchCoins('usd').then(coins => {
      this.coins = coins.slice(0, 10);
    });
  }

  numberWithCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}



