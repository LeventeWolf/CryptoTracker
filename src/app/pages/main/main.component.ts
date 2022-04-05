import { Component, OnInit } from '@angular/core';
import Axios from "axios";
import {CoinList} from "../../../api/api";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}

export interface Coin  {
  id: string,
  name: string,
  symbol: string,
  image: string,
  current_price: number,
  market_cap: number,
  price_change_percentage_24h: number;
}

export async function fetchCoins(currency: 'usd' | 'huf') {
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
