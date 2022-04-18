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
