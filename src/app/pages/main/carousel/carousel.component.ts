import {Component, OnInit} from '@angular/core';
import {Coin, fetchCoins} from "../main.component";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  random_coins: Coin[] = [];

  constructor() {

  }

  async ngOnInit(): Promise<void> {
    await fetchCoins('usd').then(coins => {
      this.random_coins = this.getNRandomCoins(coins, 4);
    });

    setInterval(async () => {
      await fetchCoins('usd').then(coins => {
        this.random_coins = this.getNRandomCoins(coins, 4);
      });
    }, 8000);

    // startAnimation();
  }


  getNRandomCoins(coins: Coin[], n: number): Coin[] {
    const result: Coin[] = [];

    for (let i = 1; i <= n; i++) {
      result.push(coins[Math.floor(Math.random() * coins.length)]);
    }

    return result;
  }

}
