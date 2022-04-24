import {Component, OnInit} from '@angular/core';
import {Coin, defaultCoin} from "../../shared/models/coin";
import {ActivatedRoute} from "@angular/router";
import {CoinService} from "../../shared/services/coin.service";


@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {
  coin: Coin = defaultCoin;

  constructor(private route: ActivatedRoute, private coinService: CoinService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.coinService.fetchCoin(id)
      .then(response => {
        this.coin = response.data;
      })
      .catch(error => {
        console.error(`[COIN-SERVICE] Error while fetching single coin:`);
        console.error(error);
      });
  }
}
