import {Component, OnInit} from '@angular/core';
import {Coin} from "../../../shared/models/coinTable";
import {Router} from "@angular/router";
import {CoinService} from "../../../shared/services/coin.service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  random_coins: Coin[] = [];
  innerWidth = window.innerWidth;
  private readonly _number_of_coins: number;

  constructor(private router:Router, private coinService: CoinService) {
    if (innerWidth < 600) {
      this._number_of_coins = 3;
    } else {
      this._number_of_coins = 4;
    }
  }

  async ngOnInit(): Promise<void> {
    await this.coinService.fetchCoins('usd').then(coins => {
      this.random_coins = this.getNRandomCoins(coins, this._number_of_coins);
    });

    setInterval(async () => {
      await this.coinService.fetchCoins('usd').then(coins => {
        this.random_coins = this.getNRandomCoins(coins, this._number_of_coins);
      });
    }, 8000);

    // startAnimation();
  }

  onResize($event: any) {
    // @ts-ignore
    this.innerWidth = event.target.innerWidth;
  }


  getNRandomCoins(coins: Coin[], n: number): Coin[] {
    const result: Coin[] = [];

    for (let i = 1; i <= n; i++) {
      result.push(coins[Math.floor(Math.random() * coins.length)]);
    }

    return result;
  }

  menuSwitch(id: string) {
    this.router.navigateByUrl('crypto/' + id)
  }
}
