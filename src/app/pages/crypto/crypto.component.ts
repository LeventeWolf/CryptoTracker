import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SingleCoin} from "../../../api/api";
import Axios from "axios";
import {Coin, defaultCoin} from "../../shared/models/coin";


@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {
  coin: Coin = defaultCoin;
  value: number = 0;
  dateGroup: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    Axios.get(SingleCoin(id))
      .then(response => {
        this.coin = response.data
      })
      .catch(error => {
        console.error('[ERROR] Fetching single coin data')
        console.log(error);
      })
  }



}
