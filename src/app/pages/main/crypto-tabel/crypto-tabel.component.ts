import {Component, OnInit} from '@angular/core';
import Axios from "axios";
import {CoinList} from '../../../../api/api'

interface Coin  {
  id: string,
  name: string,
  symbol: string,
  image: string,
  current_price: number,
  market_cap: number,
  price_change_percentage_24h: number;
}

@Component({
  selector: 'app-crypto-tabel',
  templateUrl: './crypto-tabel.component.html',
  styleUrls: ['./crypto-tabel.component.scss']
})
export class CryptoTabelComponent implements OnInit {
  public coins: Coin[] = [];

  constructor() {}

  async ngOnInit(): Promise<void> {
    await fetchCoins('usd').then(coins => {
      this.coins = coins.slice(0, 10);
    });

    console.log(this.coins);
  }

  numberWithCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


}

async function fetchCoins(currency: 'usd' | 'huf') {
  let result: any = [];

  await Axios.get(CoinList(currency))
    .then(response => {
      result = response.data;
    })
    .catch(response => {
      console.log(`[CryptoTable] FetchCoins Error!`)
      console.log(response)
    })

  return result;
}

