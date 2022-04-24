import { Injectable } from '@angular/core';
import Axios from "axios";
import {CoinList, SingleCoin} from "../../../api/api";

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor() { }

  async fetchCoins(currency: 'usd' | 'huf') {
    let result: any = [];

    await Axios.get(CoinList(currency))
      .then(response => {
        result = response.data;
      })
      .catch(response => {
        console.error(`[COIN-SERVICE] FetchCoins Error!`)
        console.log(response)
      })

    return result;
  }

  async fetchCoin(id: string) {
    return Axios.get(SingleCoin(id));
  }

}
