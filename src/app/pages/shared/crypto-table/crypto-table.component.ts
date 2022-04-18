import {Component, OnInit} from '@angular/core';
import {fetchCoins} from '../../main/main.component';
import {Router} from "@angular/router";
import {Coin} from "../../../shared/models/coinTable";

@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss']
})
export class CryptoTableComponent implements OnInit {
  public coins: Coin[] = [];
  innerWidth = window.innerWidth;

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    await fetchCoins('usd').then(coins => {
      this.coins = coins.slice(0, 10);
    });
  }

  onResize($event: any) {
    // @ts-ignore
    this.innerWidth = event.target.innerWidth;
  }

  marketCap(price: number): string {
    if (this.innerWidth < 600) {
      return price.toString().substring(0, 3) + ' B';
    } else {
      return this.numberWithCommas(price).toString().slice(0, -6) + ' M';
    }
  }

  numberWithCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  menuSwitch(coin: string) {
    this.router.navigateByUrl('crypto/' + coin)
  }
}



